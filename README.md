<img align="right" src="https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/redlogo.png">


[![](https://img.shields.io/badge/Bulma-0.9.0-green)](https://bulma.io/)
[![](https://img.shields.io/badge/Sails.js-1.3.1-green)](https://sailsjs.com/)
[![](https://img.shields.io/badge/Support-Web-and-Mobile-green)](https://bulma.io/)

# Qpon 

support Web (m1 & m2) and Mobile (m3)

a Voucher application will
- help users valid and search Voucher at ease.
- help restaurants pre-set the amount , quantity and valid dates of Voucher at ease.

## Content
- <a href="#m1">Milestone 1</a>
- <a href="#m2">Milestone 2</a>
- <a href="#m3">Milestone 3 </a>


## <a name="m1">Milestone 1</a>

Qpon suppports the following function,click to see the **demonstration**.

1. <a href="#1">Read</a>
2. <a href="#2">Create</a>
3. <a href="#3">Update</a>
4. <a href="#4">Delete</a>
5. <a href="#5">Search&Pagination</a>

### <a name="1">Read  Voucher</a>
- Read all Voucher and each region displays the two latest coupons.
- Clicking the link on the first page will see this detail pageand their details.

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/read.gif)

### <a name="2">Create new Voucher</a>
- Create new Voucher and homepage will show the two latest coupons in each region

  ![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/create.gif)

### <a name="3">Update Voucher</a>
- Update voucher in the admin page

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/update.gif)

### <a name="4">Delete Voucher</a>
- Delete voucher in the update page when administrators update the vocher

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/delete.gif)

### <a name="5">Search Voucher and return Pagination result</a>

Search Voucher,if results exist,Pagination results will show.
Otherwise,the Not Found hint will show.

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/search.gif)

## <a name="m2">Milestone 2</a>

In this version, Qpon support the login system, Redeem system and coupons management system.

All function will be divided into three part to display:

- <a href="#nv">the normal passers view </a>
- <a href="#sv">the system users view </a>
- <a href="#av">the system administrator view</a>

### <a name="nv">Passers view</a>
Passers can only browse and search for coupons

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/ms2normal.gif)

### <a name="sv">Users view</a>
System users can have their own personal details beside of the right of normal passers.

They can redeem coupons if they have enough account balance and cancel their redeem if they dont want them . 

They can see their details and redeem record in Myredeem page in which they can manage their redeem easily.

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/ms2user.gif)

### <a name="av">Administrator view</a>
System admin can manage the coupons such as creating,deleting and updating.

Also, admin can see who have redeemed the coupon and is able to cancel the redeeming record of them. 

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-sails-JQ20/blob/master/readmesource/ms2admin.gif)



## <a name="m3">Milestone 3 Basic</a>

This part meet all basic requiremnets of milestone 3 develping.


Qpon suppports the following function,click to see the **demonstration**.

1. <a href="#31">Show all coupons</a>
2. <a href="#32">Show all Malls</a>
3. <a href="#33">Show some coin ranges</a>
4. <a href="#34">Show users profile , login/logout and redeem</a>


### <a name="31">Show all coupons</a>
- Read all Voucher and their positions.

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/1.gif)

### <a name="32">Show all Malls</a>
- Read all malls ,their positions and all restaurants offering coupons there.

  ![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/2.gif)

### <a name="33">Show some coin ranges</a>
- Read all coupons in three ranges 

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/3.gif)

### <a name="34">Show users' profile , login/logout and redeem function</a>
- Login or Logout the qpon system.

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/4.gif)

- redeem coupons, see their redeem.
- Cant redeem when users dont have enough coupons or have already redeemed and there is not enough quotas.

![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/5.gif)

## <a name="">Milestone 3 Advanced</a>

This part tries some advanced functions of Qpon system.

Advanced functions involves:

1. <a href="#35">Users can cancel their redeems.</a>
2. <a href="#36">Users can see their personal details.</a>
3. <a href="#37">Users can see their balance more </a>conveniently when it changes.</a>
4. <a href="#38">Users have their own avatars and can freely change to their favorate.</a>
5. <a href="#39">Users can recharge their coins by inputing recharging code which they can buy it from stores.</a>

### <a name="35">Users can cancel their redeems.</a>
![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/ad1.gif)

Because of the problem if github, the uploaded gifs cant be shown.
So, the demostration have been put into Youtube, you can click this link to check the remaining part 2 to 5.
https://www.youtube.com/watch?v=WhewUM3ooKQ&list=PLQ_KKybEmuCqbCbkkaQlq_gAJ-x3Jnbw7&index=1
### <a name="36">Users can see their personal details.</a>
![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/ad2.gif)
### <a name="37">Users can see their balance more </a>conveniently when it changes.</a>
![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/ad3.gif)
### <a name="38">Users have their own avatars and can freely change to their favorate.</a>
![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/ad4.gif)
### <a name="39">Users can recharge their coins by inputing recharging code which they can buy it from stores.</a>
![image](https://github.com/MSc-CS-HKBU/comp7270-fall2020-s2-m3-JQ20/blob/master/readmeResource/ad5.gif)






