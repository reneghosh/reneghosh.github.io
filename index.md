---
layout: home
date: 2020-12-30
# author:
  # twitter: reghosh
---



<div>
  <div class="section-title"><h1>Code</h1></div>
  <div class="field">
  {% assign site-code = site.code | sort: 'date' | reverse %}
  {% for code in site-code %}
  <div class="section">  
    <div class="section-body">
      <h2>{{code.title}}</h2>  
    {{code}}
    </div>
  </div>
  {% endfor %}
</div>
  

</div>

<div>
  <div class="section-title"><h1>Articles</h1></div>    
  <div class="field">
    {% assign site-published = site.published | sort: 'date_published' | reverse %}
    {% for link in site-published %}
    {{link}}
    {% endfor %}
</div>

{% include about.html %}

