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
<dt>check-disabled [String]</dt>
<dd>OPTIONAL. The value should be a variable that can get from $scope. DEFAULT: undefined.</dd>
</dl>
