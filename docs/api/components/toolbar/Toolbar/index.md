---
layout: "/docs_base"
version: "nightly"
versionHref: "/docs/v2"
path: ""
category: api
id: "toolbar"
title: "Toolbar"
header_sub_title: "Ionic API Documentation"
doc: "Toolbar"
docType: "class"
show_preview_device: true
preview_device_url: "/docs/v2/demos/toolbar/"
angular_controller: APIDemoCtrl 
---









<h1 class="api-title">
<a class="anchor" name="toolbar" href="#toolbar"></a>

Toolbar






</h1>

<a class="improve-v2-docs" href="http://github.com/driftyco/ionic/edit/2.0//ionic/components/toolbar/toolbar.ts#L60">
Improve this doc
</a>






<p>The toolbar is generic bar that sits above or below content.
Unlike an <code>Navbar</code>, <code>Toolbar</code> can be used for a subheader as well.
Since it&#39;s based on flexbox, you can place the toolbar where you
need it and flexbox will handle everything else. Toolbars will automatically
assume they should be placed before an <code>ion-content</code>, so to specify that you want it
below, you can add the property <code>position=&quot;bottom&quot;</code>. This will change the flex order
property.</p>


<h2><a class="anchor" name="Component" href="#Component"></a>Component</h2>
<h3>selector: <code>ion-toolbar</code></h3>
<!-- @usage tag -->

<h2><a class="anchor" name="usage" href="#usage"></a>Usage</h2>

<pre><code class="lang-html">&lt;ion-toolbar&gt;
  &lt;ion-title&gt;My Toolbar Title&lt;/ion-title&gt;
&lt;/ion-toolbar&gt;

&lt;ion-toolbar&gt;
  &lt;ion-title&gt;I&#39;m a subheader&lt;/ion-title&gt;
&lt;/ion-toolbar&gt;

 &lt;ion-content&gt;&lt;/ion-content&gt;

&lt;ion-toolbar position=&quot;bottom&quot;&gt;
  &lt;ion-title&gt;I&#39;m a subfooter&lt;/ion-title&gt;
&lt;/ion-toolbar&gt;

&lt;ion-toolbar position=&quot;bottom&quot;&gt;
  &lt;ion-title&gt;I&#39;m a footer&lt;/ion-title&gt;
&lt;/ion-toolbar&gt;
</code></pre>




<!-- @property tags -->

<h2><a class="anchor" name="attributes" href="#attributes"></a>Attributes:</h2>
<table class="table" style="margin:0;">
<thead>
<tr>
<th>Attribute</th>








<th>Type</th>


<th>Description</th>
</tr>
</thead>
<tbody>

<tr>
<td>
position
</td>


<td>
any
</td>


<td>
set position of the toolbar, `top` or `bottom`.
Default `top`.
</td>
</tr>

</tbody>
</table>



<!-- instance methods on the class --><!-- related link -->

<h2><a class="anchor" name="related" href="#related"></a>Related</h2>

<a href='../../navbar/Navbar/'>Navbar API Docs</a><!-- end content block -->


<!-- end body block -->

