---
title: "Optimizing reads by 10x: Dedicated Query Server"
date: 2025-09-01
tag: infrastructure
description: "An account of the multi-tenant, eventually consistent, role-based access system I built at NeoDocs that allowed for observing and aggregating 1M+ datapoints."
---

Let's set the stage. I am working at NeoDocs, a YCombinator-backed health-tech startup that is about to generate a lot of data because of a recently awarded government contract. Our systems, initially built for the purposes of a quickly built, mobile-first and individual experience would prove to be too tedious.

The IIT Bombay incubated startup primarily creates urine testing kits that can be scanned to get insights into your health where computer vision and traditional ML models take the reins giving you 12+ parameters, accurately measured within 60 seconds. Okay, enough free promotion. Now let's get to the meat of my magnum opus (what delusion of grandeur?) here.

Firebase (Google's Infrastructure as a Service (IaaS)) is great for proof of concepts or mobile-only experiences - especially with Flutter (the _unofficial_ NeoDocs stack) but, it lacks first-party features when it comes to manipulating or processing data efficiently. The pay-per-read/write model sucks - exploding in costs when you choose to extract insights from your data. So, the requirements were simple: a **simple and cost-effective** solution that doesn't affect performance of the existing DB and can be eventually consistent with it.

I come across the lesson "don't reinvent the wheel" quite often (most recently in the [Amazon Aurora whitepaper](https://assets.amazon.science/dc/2b/4ef2b89649f9a393d37d3e042f4e/amazon-aurora-design-considerations-for-high-throughput-cloud-native-relational-databases.pdf)). In this case too, we leveraged Google's distributed firestore and load balancing to limit the scope of this project to synchronizing with a query replica. We chose MongoDB because it is the most popular NoSQL database and the capabilities of its aggregation pipeline satisfied our needs. One other benefit is that its document limits are more permissive than Firestore, meaning that any document in Firestore is guaranteed to be within MongoDB's limits.

### The Solution

Sparing the low-level details, the whole system is a bunch of functions saving to a message queue (think Kafka but way, way off-brand) feeding into a dedicated MongoDB server.

![System Architecture Image](/static/blog/query-server/fig1-dark.png)

##### The Bunch of Functions

You can set functions on document glob patterns on Firebase that can be triggered on update with an "atleast once" mechanism. This means the functions must be idempotent i.e, multiple invocations should not produce side effects. This meant that we could pass updates to the query server and add state to the queuing process or keep it stateless and pass the whole updated document.
We chose the latter because of two reasons:

1. Reduced complexity and moving parts make the system easier to maintain in the long run. Recovery of the data in case of failure of the queue/missed updates is simpler.
2. For our most frequent database write (at the time of a test), I observed that the same document was updated multiple times. This could be optimized by writing to MongoDB, only the latest version of the document.

##### Message Queue (Off-Brand Kafka)

The dedicated server was primarily a query server, so we wanted to reduce the number of writes as much as possible. Using MongoDB's batch upsert operation along with a queue helped us achieve this goal.
We used Firebase Realtime DB for storing the unsynchronized states between batch upserts to MongoDB. One of the requirements of the whole system was to be cost-effective and Firebase RealtimeDB charges based on the amount of data stored (instead of the number of writes as in Firestore), amounting to a grand total of $0 (because of the free tier :) for a short enough update window in its use as a transient store.

### Conclusion

This was my first BIG project at NeoDocs with total autonomy - requiring database schema design (for logging and tracking updates), building failsafes, health checks, etc. and I am proud to share that this system has not yet failed in production and continues to power a small (but important) part of the company's operations. It is also particularly special for me because every component was thought out such that it it stuck to the requirements without incurring any additional costs and I also really liked the use of Realtime DB as a transient storage and queue (I wish I had come up with something so ingenious).
Unless you have this exact use-case, I wouldn't recommend even looking to create a system like this but maybe that is a part of the appeal too... a unique piece of software no one would ever recreate <3
