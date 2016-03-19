function getLength(str)
{
	return str.replace(/[^\x00-xff]/g,"aa").length;
}
window.onload=function()
{
	var aInput = document.getElementsByTagName("input");
	var oName = aInput[0];
	var aP = document.getElementsByTagName("p");
	var name_msg = aP[0];
	var count = document.getElementById("count")
	var name_length = 0;
	var pwd1 = aInput[1];
	var pwd1_msg = aP[1];
	var pwd2 = aInput[2];
	var pwd2_msg = aP[2];
	var aEm = document.getElementsByTagName("em");
	
//用户名
	oName.onfocus = function()
	{
		name_msg.style.display = "block";
		name_msg.innerHTML = "<i class='ati'></i>5-25个字符，一个汉字为两个字符，推荐使用中文会员名";
	}
	oName.onkeyup = function()
	{
		count.style.visibility = "visible";
		name_length = getLength(this.value);
		count.innerHTML = name_length + "个字符";
		if(getLength(this.value) == 0)
		{
			count.style.visibility = "hidden";
		}
	}
	oName.onblur = function()
	{
		var re = /[^\w\u4e00-\u9fa5]/g;
		if(re.test(this.value))
		{
			name_msg.innerHTML = '<i class="err"></i>含有非法字符！';
		}
		else if(this.value == "")
		{
			name_msg.innerHTML='<i class="err"></i>不能为空！';
		}
		else if(name_length > 25)
		{
			name_msg.innerHTML='<i class="err"></i>长度超过25！';
		}
		else if(name_length < 6)
		{
			name_msg.innerHTML='<i class="err"></i>长度小于6！';
		}
		else
		{
			name_msg.innerHTML='<i class="ok"></i>OK！';
		}
	}
//登陆密码
	pwd1.onfocus=function()
	{
		pwd1_msg.style.display = "block";
		pwd1_msg.innerHTML = '<i class="err"></i>6-16个字符，请使用字母加数字或符号组合密码，不能单独使用字母、数字、或符号。';
	}
	pwd1.onkeyup = function()
	{
		if(this.value.length > 5)
		{
			aEm[1].className = "active";
			pwd2.removeAttribute("disabled");
			pwd2_msg.style.display = "block";
		}
		else
		{
			aEm[1].className = "";
			pwd2.setAttribute("disabled","disabled");
			pwd2_msg.style.display = "none";
		}
		if(this.value.length > 10)
		{
			aEm[2].className = "active";
		}
		else
		{
			aEm[2].className = "";
		}
	}
	function findStr(str,n)
	{
		tmp = 0;
		for(i = 0; i<str.length; i++)
		{
			if(str.charAt(i) == n)
			{
				tmp++;
			}
		}
		return tmp;
	}
	pwd1.onblur = function()
	{
		var m = findStr(this.value,this.value[0]);
		var re_n = /[^\d]/g;
		var re_t = /[^a-zA-Z]/g;
		if(this.value == "")
		{
			pwd1_msg.innerHTML = '<i class="err"></i>不能为空';				
		}		
		else if(this.value.length < 6||this.value.length > 16)
		{
			pwd1_msg.innerHTML='<i class="err"></i>长度为6-16字符!';
		}
		else if(!re_n.test(this.value))
		{
			pwd1_msg.innerHTML='<i class="err"></i>不能全为数字!';
		}
		else if(!re_t.test(this.value))
		{
			pwd1_msg.innerHTML='<i class="err"></i>不能全为字母!';
		}
		else if(this.value.length = m)
		{
			pwd1_msg.innerHTML='<i class="err"></i>不能用相同字符！';
		}
		else
		{
			pwd1_msg.innerHTML='<i class="ok"></i>OK!'
		}
	}
//确认密码
	pwd2.onblur = function()
	{
		if(this.value !== pwd1.value)
		{
			pwd2_msg.innerHTML='<i class="err"></i>两次输入的密码不一致!'
		}
		else
		{
			pwd2_msg.innerHTML='<i class="ok"></i>OK!'
		}
	}
}