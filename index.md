---
layout: home
---

{% include about.html %}

<h1><span class="fa fa-book">Books</span></h1>
<div class="row" id="books">
<div class="container-fluid">
<p>I've written three novels and two short story collections. The short stories were written for stage performance, all falling neatly into the readable-aloud-in-five-minutes format, whereas the novels are sprawls. Reading either depends on where you are and how much mindspace you want to spare.</p>
</div>
</div>
{% for book in site.books | sort: 'book.release', last %}
{{book}}
{% endfor %}

<h1><span class="fa fa-headphones">Music</span></h1>

My music is released under the name of my one-man-band, Satellite Ray.

I'm currently working on an album of all-electronic music. I'm making all the music from a phone app and 
recording vocals separately.

{% for track in site.music %}
{{track}}
{% endfor %}

<div class="row page" id="other">
<div class="container-fluid">
<h1><span class="fa fa-bookmark"> Other work</span></h1>

{% for link in site.published | sort: 'date' %}
{{link}}
{% endfor %}

</div>
</div>

<script type="application/ld+json">
{ 
"@context": "http://schema.org", 
"@type": "WebSite", 
"url": "http://reneghosh.github.io/", 
"name": "René Ghosh, writer, musician",
 "author": {
    "@type": "Person",
    "name": "René Ghosh"
  },
"description": "René Ghosh, writer and musician. Books, music, and links to articles.",
"publisher": "René Ghosh"
}
</script>

