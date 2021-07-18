---
layout: home
date: 2021-03-07
title: René Ghosh - homepage
---

<div>
  <div class="section-title" id="articles"><h1>Articles</h1></div>    
  <div class="field">
    {% assign site-published = site.published | sort: 'date_published' | reverse %}
    {% for link in site-published %}
    {{link}}
    {% endfor %}
</div>

<div>
  <div class="section-title" id="code"><h1>Code</h1></div>
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

{% include about.html %}

