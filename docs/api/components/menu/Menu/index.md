---
layout: "/docs_base"
version: "nightly"
versionHref: "/docs/v2"
path: ""
category: api
id: "menu"
title: "Menu"
header_sub_title: "Ionic API Documentation"
doc: "Menu"
docType: "class"
show_preview_device: true
preview_device_url: "/docs/v2/demos/menu/"
angular_controller: APIDemoCtrl 
---









<h1 class="api-title">
<a class="anchor" name="menu" href="#menu"></a>

Menu






</h1>

<a class="improve-v2-docs" href="http://github.com/driftyco/ionic/edit/2.0//ionic/components/menu/menu-controller.ts#L1">
Improve this doc
</a>






<p>Menu is a side-menu interface that can be dragged and toggled to open or close.
An Ionic app can have numerous menus, all of which can be controlled within
template HTML, or programmatically.</p>

<!-- @usage tag -->

<h2><a class="anchor" name="usage" href="#usage"></a>Usage</h2>

<p>In order to use Menu, you must specify a <a href="https://angular.io/docs/ts/latest/guide/user-input.html#local-variables">reference</a>
to the content element that Menu should listen on for drag events, using the <code>content</code> property.
This is telling the menu which content the menu is attached to, so it knows which element to
move over, and to respond to drag events. Note that a <strong>menu is a sibling to its content</strong>.</p>
<pre><code class="lang-html">&lt;ion-menu [content]=&quot;mycontent&quot;&gt;
  &lt;ion-content&gt;
    &lt;ion-list&gt;
    ...
    &lt;/ion-list&gt;
  &lt;/ion-content&gt;
&lt;/ion-menu&gt;

&lt;ion-nav #mycontent [root]=&quot;rootPage&quot;&gt;&lt;/ion-nav&gt;
</code></pre>
<p>By default, Menus are on the left, but this can be overridden with the <code>side</code>
property:</p>
<pre><code class="lang-html">&lt;ion-menu side=&quot;right&quot; [content]=&quot;mycontent&quot;&gt;...&lt;/ion-menu&gt;
</code></pre>
<h3 id="programmatic-interaction">Programmatic Interaction</h3>
<p>To programmatically interact with any menu, you can inject the <code>MenuController</code>
provider into any component or directive. This makes it easy get ahold of and
control the correct menu instance. By default Ionic will find the app&#39;s menu
without requiring a menu ID.</p>
<pre><code class="lang-ts">import{Page, MenuController} from &#39;ionic-angular&#39;;
@Page({...})
export class MyPage {
 constructor(menu: MenuController) {
   this.menu = menu;
 }

 openMenu() {
   this.menu.open();
 }

}
</code></pre>
<p>Note that if you want to easily toggle or close a menu just from a page&#39;s
template, you can use <code>menuToggle</code> and/or <code>menuClose</code> to accomplish the same
tasks as above.</p>
<h3 id="apps-with-left-and-right-menus">Apps With Left And Right Menus</h3>
<p>For apps with a left and right menu, you can control the desired
menu by passing in the side of the menu.</p>
<pre><code class="lang-html">&lt;ion-menu side=&quot;left&quot; [content]=&quot;mycontent&quot;&gt;...&lt;/ion-menu&gt;
&lt;ion-menu side=&quot;right&quot; [content]=&quot;mycontent&quot;&gt;...&lt;/ion-menu&gt;
&lt;ion-nav #mycontent [root]=&quot;rootPage&quot;&gt;&lt;/ion-nav&gt;
</code></pre>
<pre><code class="lang-ts">openLeftMenu() {
  this.menu.open(&#39;left&#39;);
}

closeRightMenu() {
  this.menu.close(&#39;right&#39;);
}
</code></pre>
<h3 id="apps-with-multiple-same-side-menus">Apps With Multiple, Same Side Menus</h3>
<p>Since more than one menu on a the same side is possible, and you wouldn&#39;t want
both to be open at the same time, an app can decide which menu should be enabled.
For apps with multiple menus on the same side, it&#39;s required to give each menu a
unique ID. In the example below, we&#39;re saying that the left menu with the
<code>authenticated</code> id should be enabled, and the left menu with the <code>unauthenticated</code>
id be disabled.</p>
<pre><code class="lang-html">&lt;ion-menu id=&quot;authenticated&quot; side=&quot;left&quot; [content]=&quot;mycontent&quot;&gt;...&lt;/ion-menu&gt;
&lt;ion-menu id=&quot;unauthenticated&quot; side=&quot;left&quot; [content]=&quot;mycontent&quot;&gt;...&lt;/ion-menu&gt;
&lt;ion-nav #mycontent [root]=&quot;rootPage&quot;&gt;&lt;/ion-nav&gt;
</code></pre>
<pre><code class="lang-ts">enableAuthenticatedMenu() {
  this.menu.enable(true, &#39;authenticated&#39;);
  this.menu.enable(false, &#39;unauthenticated&#39;);
}
</code></pre>
<p>Note that if an app only had one menu, there is no reason to pass a menu id.</p>
<h3 id="menu-types">Menu Types</h3>
<p>Menu supports two display types: <code>overlay</code>, <code>reveal</code> and <code>push</code>. Overlay
is the traditional Material Design drawer type, and Reveal is the traditional
iOS type. By default, menus will use to the correct type for the platform,
but this can be overriden using the <code>type</code> property:</p>
<pre><code class="lang-html">&lt;ion-menu type=&quot;overlay&quot; [content]=&quot;mycontent&quot;&gt;...&lt;/ion-menu&gt;
</code></pre>
<h3 id="persistent-menus">Persistent Menus</h3>
<p>By default, menus, and specifically their menu toggle buttons in the navbar,
only show on the root page within its <code>NavController</code>. For example, on Page 1
the menu toggle will show in the navbar. However, when navigating to Page 2,
because it is not the root Page for that <code>NavController</code>, the menu toggle
will not show in the navbar.</p>
<p>Not showing the menu toggle button in the navbar is commonly seen within
native apps after navigating past the root Page. However, it is still possible
to always show the menu toggle button in the navbar by setting
<code>persistent=&quot;true&quot;</code> on the <code>ion-menu</code> component.</p>
<pre><code class="lang-html">&lt;ion-menu persistent=&quot;true&quot; [content]=&quot;content&quot;&gt;...&lt;/ion-menu&gt;
</code></pre>




<!-- @property tags -->



<!-- instance methods on the class -->

<h2><a class="anchor" name="instance-members" href="#instance-members"></a>Instance Members</h2>

<div id="open"></div>

<h3>
<a class="anchor" name="open" href="#open"></a>
<code>open()</code>
  

</h3>

Progamatically open the Menu.






<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Promise</code> <p>returns a promise when the menu is fully opened</p>


</div>




<div id="close"></div>

<h3>
<a class="anchor" name="close" href="#close"></a>
<code>close(menuId)</code>
  

</h3>

Progamatically close the Menu. If no `menuId` is given as the first
argument then it'll close any menu which is open. If a `menuId`
is given then it'll close that exact menu.


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
        menuId
        
        
      </td>
      <td>
        
  <code>string</code>
      </td>
      <td>
        <p>Optionally get the menu by its id, or side.</p>

        
      </td>
    </tr>
    
  </tbody>
</table>





<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Promise</code> <p>returns a promise when the menu is fully closed</p>


</div>




<div id="toggle"></div>

<h3>
<a class="anchor" name="toggle" href="#toggle"></a>
<code>toggle(menuId)</code>
  

</h3>

Toggle the menu. If it's closed, it will open, and if opened, it
will close.


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
        menuId
        
        
      </td>
      <td>
        
  <code>string</code>
      </td>
      <td>
        <p>Optionally get the menu by its id, or side.</p>

        
      </td>
    </tr>
    
  </tbody>
</table>





<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Promise</code> <p>returns a promise when the menu has been toggled</p>


</div>




<div id="enable"></div>

<h3>
<a class="anchor" name="enable" href="#enable"></a>
<code>enable(menuId)</code>
  

</h3>

Used to enable or disable a menu. For example, there could be multiple
left menus, but only one of them should be able to be opened at the same
time. If there are multiple menus on the same side, then enabling one menu
will also automatically disable all the others that are on the same side.


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
        menuId
        
        
      </td>
      <td>
        
  <code>string</code>
      </td>
      <td>
        <p>Optionally get the menu by its id, or side.</p>

        
      </td>
    </tr>
    
  </tbody>
</table>





<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Menu</code> <p>Returns the instance of the menu, which is useful for chaining.</p>


</div>




<div id="swipeEnable"></div>

<h3>
<a class="anchor" name="swipeEnable" href="#swipeEnable"></a>
<code>swipeEnable(shouldEnable,&nbsp;menuId)</code>
  

</h3>

Used to enable or disable the ability to swipe open the menu.


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
        shouldEnable
        
        
      </td>
      <td>
        
  <code>boolean</code>
      </td>
      <td>
        <p>True if it should be swipe-able, false if not.</p>

        
      </td>
    </tr>
    
    <tr>
      <td>
        menuId
        
        
      </td>
      <td>
        
  <code>string</code>
      </td>
      <td>
        <p>Optionally get the menu by its id, or side.</p>

        
      </td>
    </tr>
    
  </tbody>
</table>





<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Menu</code> <p>Returns the instance of the menu, which is useful for chaining.</p>


</div>




<div id="isOpen"></div>

<h3>
<a class="anchor" name="isOpen" href="#isOpen"></a>
<code>isOpen()</code>
  

</h3>








<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>boolean</code> <p>Returns true if the menu is currently open, otherwise false.</p>


</div>




<div id="isEnabled"></div>

<h3>
<a class="anchor" name="isEnabled" href="#isEnabled"></a>
<code>isEnabled()</code>
  

</h3>








<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>boolean</code> <p>Returns true if the menu is currently enabled, otherwise false.</p>


</div>




<div id="get"></div>

<h3>
<a class="anchor" name="get" href="#get"></a>
<code>get(menuId)</code>
  

</h3>

Used to get a menu instance. If a `menuId` is not provided then it'll
return the first menu found. If a `menuId` is `left` or `right`, then
it'll return the enabled menu on that side. Otherwise, if a `menuId` is
provided, then it'll try to find the menu using the menu's `id`
property. If a menu is not found then it'll return `null`.


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
        menuId
        
        
      </td>
      <td>
        
  <code>string</code>
      </td>
      <td>
        <p>Optionally get the menu by its id, or side.</p>

        
      </td>
    </tr>
    
  </tbody>
</table>





<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Menu</code> <p>Returns the instance of the menu if found, otherwise <code>null</code>.</p>


</div>




<div id="getMenus"></div>

<h3>
<a class="anchor" name="getMenus" href="#getMenus"></a>
<code>getMenus()</code>
  

</h3>








<div class="return-value">
<i class="icon ion-arrow-return-left"></i>
<b>Returns:</b> 
  <code>Array&lt;Menu&gt;</code> <p>Returns an array of all menu instances.</p>


</div>


<!-- related link -->

<h2><a class="anchor" name="related" href="#related"></a>Related</h2>

<a href='/docs/v2/components#menus'>Menu Component Docs</a>,
<a href='/docs/v2/components#navigation'>Navigation Component Docs</a>,
<a href='../../nav/Nav'>Nav API Docs</a><!-- end content block -->


<!-- end body block -->

