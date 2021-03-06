---
layout: home
date: 2020-12-30
# author:
  # twitter: reghosh
---

<div class="brand">
  <img src="images/selfie.jpg" height="100" class="img-circular" style="float:left;margin: 1em">
    <p>
    René Ghosh homepage
  </p>
</div>

<div class="section full-card" id="code">
  <div class="section-title"><h1>Code</h1></div>
</div>

{% assign site-code = site.code | sort: 'date' | reverse %}
{% for code in site-code %}
<div class="section">  
  <div class="section-body">
    <h2>{{code.title}}</h2>  
  {{code}}
  </div>
</div>
{% endfor %}

<div class="section full-card" id="articles">
  <div class="section-title">
    <h1>Articles</h1>
  </div>
</div>


{% assign site-published = site.published | sort: 'date_published' | reverse %}
{% for link in site-published %}
{{link}}
{% endfor %}

{% include about.html %}

