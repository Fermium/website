---
layout: "v2_fluid/docs_base"
version: "nightly"
versionHref: "/docs/v2"
path: ""
category: api
id: "app"
title: "App"
header_sub_title: "Ionic API Documentation"
doc: "App"
docType: "function"

---









<h1 class="api-title">
<a class="anchor" name="app" href="#app"></a>

App






</h1>

<a class="improve-v2-docs" href="http://github.com/driftyco/ionic/edit/2.0//ionic/decorators/app.ts#L32">
Improve this doc
</a>






<p>App is an Ionic decorator that bootstraps an application. It can be passed a
number of arguments that act as global config variables for the app.
<code>@App</code> is similar to Angular&#39;s <code>@Component</code> in which it can accept a <code>template</code>
property that has an inline template, or a <code>templateUrl</code> property that points
to an external html template. The <code>@App</code> decorator runs the Angular bootstrapping
process automatically, however you can bootstrap your app separately if you prefer.
Additionally, <code>@App</code> will automatically bootstrap with all of Ionic&#39;s
core components, meaning they won&#39;t all have to be individually imported and added
to each component&#39;s <code>directives</code> property.</p>

<!-- @usage tag -->

<h2><a class="anchor" name="usage" href="#usage"></a>Usage</h2>

<pre><code class="lang-ts">import {App} from &#39;ionic-angular&#39;;

@App({
  templateUrl: &#39;app/app.html&#39;,
  providers: [DataService]
})

export class MyApp{
  // Anything we would want to do at the root of our app
}
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
config
</td>


<td>
object
</td>


<td>
the app's <a href='/docs/v2/api/config/Config/'>Config</a> object.
</td>
</tr>

<tr>
<td>
prodMode
</td>


<td>
boolean
</td>


<td>
Enable Angular's production mode, which turns off assertions and other checks within the framework. Additionally, this config sets the return value of `isProd()` which is on the `IonicApp` instance. Defaults to `false`.
</td>
</tr>

<tr>
<td>
pipes
</td>


<td>
array
</td>


<td>
any pipes for your app.
</td>
</tr>

<tr>
<td>
providers
</td>


<td>
array
</td>


<td>
any providers for your app.
</td>
</tr>

<tr>
<td>
template
</td>


<td>
string
</td>


<td>
the template to use for the app root.
</td>
</tr>

<tr>
<td>
templateUrl
</td>


<td>
string
</td>


<td>
a relative URL pointing to the template to use for the app root.
</td>
</tr>

</tbody>
</table>



<!-- instance methods on the class --><!-- related link --><!-- end content block -->


<!-- end body block -->

