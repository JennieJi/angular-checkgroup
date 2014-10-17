angular-checkgroup
==================

Custom radio button &amp; checkbox directive extensions for Angular.js    

Live demo: http://jennieji.github.io/angular-checkgroup/    
Demo source: https://github.com/JennieJi/angular-checkgroup/tree/gh-pages/src    

##Start-up    
Get the latest package by bower:    
<pre><code>bower install angular-checkgroup</code></pre>    
    
Add reference to your APP like this:    
<pre><code>angular.module('app', ['checkgroup']);</code></pre>    
    
##Directives    
###checkgroup
<dl>
<dt>Attributes:</dt>
<dd>checkgroup [Array] - REQUIRED. Similar to ngModel.</dd>
<dd>checkMultiple [Boolean] - OPTIONAL. Multiple selection enabled or not. DEFAULT: false.</dd>
</dl>    
###check
<dl>
<dt>Attributes:</dt>
<dd>value [Expression] - REQUIRED.</dd>
<dd>checked [Boolean] - OPTIONAL. Similar to HTML 'checked' attribute. DEFAULT: false.</dd>
<dd>check-type [String] - OPTIONAL. Except normal check, there is 'all' and 'none' checks. Please refer to the demo to get more details. DEFAULT: undefined.</dd>
</dl>

##Releases
- <b>v 0.1.2</b>    
  Combine ‘check’ directive’s template to JS;    
  Isolate checkgroup scope;   
  Clean up the master branch by moving demo code to gh-pages branch;
  Register package to bower.

- <b>v 0.1.1</b>    
  Make attribute ‘checked’ work same as HTML original one;    
  Fix bug in the 4th demo;    
  Fix Gruntfile to make ‘grunt build’ work with demo;    
  Update the style of demo’s check options;    
  Update the information in package.json.    

- <b>v 0.1.0</b>   
  The very new repository
