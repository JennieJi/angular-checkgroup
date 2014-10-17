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
<dt>checkgroup [Array]</dt>
<dd>REQUIRED. Similar to ngModel.</dd>
<dt>checkMultiple [Boolean]</dt>
<dd>OPTIONAL. Multiple selection enabled or not. DEFAULT: false.</dd>
</dl>    
###check
<dl>
<dt>value [Expression]</dt>
<dd>REQUIRED.</dd>
<dt>checked [Boolean]</dt>
<dd>OPTIONAL. Similar to HTML 'checked' attribute. DEFAULT: false.</dd>
<dt>check-type [String]</dt>
<dd>OPTIONAL. Except normal check, there is 'all' and 'none' checks. Please refer to the demo to get more details. DEFAULT: undefined.</dd>
</dl>

##Releases
<dl>
<dt>v 0.1.2</dt>
<dd>Combine ‘check’ directive’s template to JS;</dd>
<dd>Isolate checkgroup scope;</dd>
<dd>Clean up the master branch by moving demo code to gh-pages branch;</dd>
<dd>Register package to bower.</dd>
<dl>
<dl>
<dt>v 0.1.1</dt>
<dd>Make attribute ‘checked’ work same as HTML original one;</dd>
<dd>Fix bug in the 4th demo;</dd>
<dd>Fix Gruntfile to make ‘grunt build’ work with demo;</dd>
<dd>Update the style of demo’s check options;</dd>
<dd>Update the information in package.json.</dd>
</dl>
<dl>
<dt>v 0.1.0</dt>
<dd>The very new repository</dd>
</dl>
