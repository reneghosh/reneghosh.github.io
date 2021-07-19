---
layout: home
date: 2021-03-07
title: René Ghosh - homepage
---

<div class="category">
  <div class="section-title" id="articles"><h1>Articles</h1></div>    
  <div class="field">
    {% assign site-published = site.published | sort: 'date_published' | reverse %}
    {% for link in site-published %}
    {{link}}
    {% endfor %}
  </div>
</div>

<div class="category">
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
</div>

<div class="category">
  <div class="section-title" id="books"><h1>Books</h1></div>
  <div class="field">
  {% assign site-books = site.books | sort: 'date' | reverse %}
  {% for book in site-books %}
    <div class="large-section">  
      <div class="section-body">
        <h2>{{book.title}}</h2>  
              {{book}}
      </div>
    </div>
  {% endfor %}
  </div>
</div>

{% include about.html %}
