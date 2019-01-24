---
layout: home
author:
  twitter: reghosh
---

{% include about.html %}

<div class="row" id="books">

<h1 style="margin-top: 2em"><span class="fa fa-book"> Books</span></h1>
<div class="container">
<div style="float:left;margin-right: 40px"><img alt="me thinking about other books" src="images/selfie.jpg" class="img-fluid" style="border-radius:75px" width="150"></div>

I've written three novels and three short story collections. The short stories were written for stage performance, all falling neatly into the readable-aloud-in-five-minutes format, whereas the novels are sprawls. Reading either depends on where you are and how much mindspace you want to spare.

{% assign site-books = site.books | sort: 'release' | reverse %}
{% for book in site-books %}
{{book}}
{% endfor %}

</div>
</div>

<div class="row" id="music">
<h1><span class="fa fa-headphones"> Music</span></h1>
<div class="container">


<div style="float:left;margin-right: 40px"><img alt="me thinking about other music" src="images/selfie2.jpg" class="img-fluid" style="border-radius:75px" width="150"></div>

My music is released under the name of my one-man-band, Satellite Ray.

I'm currently working on an electronic music album. I started making the music from a phone app but
have since switched to live-coding platforms.

{% for track in site.music %}
{{track}}
{% endfor %}

</div>
</div>

<div class="row page" id="other">
<div class="container-fluid">
<h1><span class="fa fa-bookmark"> Other work</span></h1>
<div style="float:left;margin-right: 40px"><img alt="me thinking about other stuff" src="images/selfie3.jpg" class="img-fluid" style="border-radius:75px" width="150"></div>

{% assign site-published = site.published | sort: 'date_published' | reverse %}
{% for link in site-published %}
{{link}}
{% endfor %}

</div>
</div>

<div class="row page" id="current">
<div class="container">
<h1><span class="fa fa-spinner"> Current work</span></h1>
I'm currently working on a collection of short stories with all the open mic stuff from 2018, and also
on a novel, a short one, about collecting sperm samples from a fictitious badger species in a fictitious country. The tentative title on the latter is "Sperm Hunters".
</div>
</div>

<script type="application/ld+json">
{
"@context": "http://schema.org",
"@type": "WebSite",
"url": "{{project.url}}",
"name": "René Ghosh, writer, musician",
 "author": {
    "@type": "Person",
    "name": "René Ghosh"
  },
"description": "René Ghosh, writer and musician. Books, music, and links to articles.",
"publisher": "René Ghosh"
}
</script>
