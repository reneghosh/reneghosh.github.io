---
layout: article
title:  "The Lane VM"
date:   2022-02-07 18:52:00 +0200
categories: articles
keywords: programming
---

# The Lane VM

the Lane VM is founded on the following principles:

- data is sent and received between lanes
- each lane has zero or more functions
- the arity of the lane is the highest arity of the linked functions
- when a lane has received the amount of data of its arity, all functions are executed
- each function's result is emitted to one of more lanes

