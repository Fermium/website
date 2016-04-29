---
layout: "docs_base"
version: "nightly"
versionHref: "/docs"
path: ""
category: api
id: "modal"
title: "Modal"
header_sub_title: "Ionic API Documentation"
doc: "Modal"
docType: "class"
show_preview_device: true
preview_device_url: "/docs/demos/modal/"
angular_controller: APIDemoCtrl 
---









<h1 class="api-title">
<a class="anchor" name="modal" href="#modal"></a>

Modal






</h1>

<a class="improve-v2-docs" href="http://github.com/driftyco/ionic/edit/2.0//ionic/components/modal/modal.ts#L2">
Improve this doc
</a>






<p>A Modal is a content pane that goes over the user&#39;s current page.
Usually it is used for making a choice or editing an item. A modal uses the
<code>NavController</code> to
<a href='/docs/api/components/nav/NavController/#present'>present</a>
itself in the root nav stack. It is added to the stack similar to how
<a href='/docs/api/components/nav/NavController/#push'>NavController.push</a>
works.</p>
<p>When a modal (or any other overlay such as an alert or actionsheet) is
&quot;presented&quot; to a nav controller, the overlay is added to the app&#39;s root nav.
After the modal has been presented, from within the component instance The
modal can later be closed or &quot;dismissed&quot; by using the ViewController&#39;s
<code>dismiss</code> method. Additionally, you can dismiss any overlay by using <code>pop</code>
on the root nav controller.</p>
<p>Data can be passed to a new modal through <code>Modal.create()</code> as the second
argument. The data can then be accessed from the opened page by injecting
<code>NavParams</code>. Note that the page, which opened as a modal, has no special
&quot;modal&quot; logic within it, but uses <code>NavParams</code> no differently than a
standard page.</p>

<!-- @usage tag -->

<h2><a class="anchor" name="usage" href="#usage"></a>Usage</h2>

<pre><code class="lang-ts">import {Page, Modal, NavController, NavParams} from &#39;ionic-angular&#39;;

@Page(...)
class HomePage {

 constructor(nav: NavController) {
   this.nav = nav;
 }

 presentProfileModal() {
   let profileModal = Modal.create(Profile, { userId: 8675309 });
   this.nav.present(profileModal);
 }

}

@Page(...)
class Profile {

 constructor(params: NavParams) {
   console.log(&#39;UserId&#39;, params.get(&#39;userId&#39;));
 }

}
</code></pre>
<p>A modal can also emit data, which is useful when it is used to add or edit
data. For example, a profile page could slide up in a modal, and on submit,
the submit button could pass the updated profile data, then dismiss the
modal.</p>
<pre><code class="lang-ts">import {Page, Modal, NavController, ViewController} from &#39;ionic-angular&#39;;

@Page(...)
class HomePage {

 constructor(nav: NavController) {
   this.nav = nav;
 }

 presentContactModal() {
   let contactModal = Modal.create(ContactUs);
   this.nav.present(contactModal);
 }

 presentProfileModal() {
   let profileModal = Modal.create(Profile, { userId: 8675309 });
   profileModal.onDismiss(data =&gt; {
     console.log(data);
   });
   this.nav.present(profileModal);
 }

}

@Page(...)
class Profile {

 constructor(viewCtrl: ViewController) {
   this.viewCtrl = viewCtrl;
 }

 dismiss() {
   let data = { &#39;foo&#39;: &#39;bar&#39; };
   this.viewCtrl.dismiss(data);
 }

}
</code></pre>




<!-- @property tags -->
<h2><a class="anchor" name="static-members" href="#static-members"></a>Static Members</h2>
<div id="create"></div>
<h3><a class="anchor" name="create" href="#create"></a><code>create(componentType,&nbsp;data)</code>
  
</h3>




<table class="table param-table" style="margin:0;">
  <thead>
    <tr>
      <th>Param</th>
      <th>Type</th>
      <th>Details</th>
    </tr>
  </thead>
  <tbody>
    
    <tr>
      <td>
        componentType
        
        
      </td>
      <td>
        
  <code>any</code>
      </td>
      <td>
        <p>Modal</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        data
        
        
      </td>
      <td>
        
  <code>object</code>
      </td>
      <td>
        <p>Modal options</p>

        
      </td>
    </tr>
    
  </tbody>
</table>









<!-- instance methods on the class --><!-- related link -->

<h2><a class="anchor" name="related" href="#related"></a>Related</h2>

<a href='/docs/components#modals'>Modal Component Docs</a><!-- end content block -->


<!-- end body block -->

