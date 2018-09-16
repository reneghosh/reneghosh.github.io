---
layout: home
---

{% include about.html %}

<div class="row" id="books">
</div>
<h1><span class="fa fa-book"> Books</span></h1>
<div class="container">

I've written three novels and two short story collections. The short stories were written for stage performance, all falling neatly into the readable-aloud-in-five-minutes format, whereas the novels are sprawls. Reading either depends on where you are and how much mindspace you want to spare.

{% for book in site.books | sort: 'book.release', last %}
{{book}}
{% endfor %}

</div>

<div class="row" id="music">
<h1><span class="fa fa-headphones"> Music</span></h1>
<div class="container">

My music is released under the name of my one-man-band, Satellite Ray.

I'm currently working on an album of all-electronic music. I'm making all the music from a phone app and 
recording vocals separately.


{% for track in site.music %}
{{track}}
{% endfor %}

</div>
</div>

<div class="row page" id="other">
<div class="container-fluid">
<h1><span class="fa fa-bookmark"> Other work</span></h1>

{% for link in site.published | sort: 'date' %}
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
"url": "https://reneghosh.github.io/", 
"name": "René Ghosh, writer, musician",
 "author": {
    "@type": "Person",
    "name": "René Ghosh"
  },
"description": "René Ghosh, writer and musician. Books, music, and links to articles.",
"publisher": "René Ghosh"
}
</script>

