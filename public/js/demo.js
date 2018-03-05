// 查询
$.ajax({
	url:"/select",
	success:function(e){
		var datas=JSON.parse(e);
		for(var i=0;i<datas.length;i++){
			$(str=`<tr id=${datas[i].id}><td class="name">${datas[i].name}</td><td class="sex">${datas[i].sex}</td><td class="age">${datas[i].age}</td>
				<td>
					<a class="btn del" id=${datas[i].id}>删除</a>
					<a class="btn">编辑</a>
				</td>
				</tr>`).appendTo('table')
		}
	}
})

$(".add").click(function(){
	$.ajax({
		url:"/add",
		success:function(e){
			if(e){
				$(str=`<tr id=${e}><td class="name"></td><td class="age"></td><td class="sex"></td><td class="message">
				<a class="del" id=${e}">删除</a>
				<a>提交</a>
				</td></tr>`).appendTo("tbody")
			}
		}
	});
})
	// 删除
	$("table").delegate(".del","click",function(){
	var id = $(this).attr("id")
	$.ajax({
		url: '/del',
		dataType: "text",
		data: {
			id: id
		},
		success: function(e) {
			if(e == "ok") {
				$(this).parent().parent().remove()
			}
		}.bind(this)
	})
})

	$("table").on("dblclick","td",function(e){
		var str = $(this).attr("class")
		var oldv = $(this).html()
		if(str==="name"||str==="sex"||str==="age"){
			$(this).html("")
			$(`<input class="input" type="text">`).appendTo($(this)).val(oldv)
			$("input").focus()
		}
		$("input").blur(function(){
			var newv=$(this).val()
			console.log()
			if(newv!=oldv){
				var id=$(this).parent().parent().attr("id")
				var str=$(this).parent().attr("class")
				var obj={id,str,newv}
				$.ajax({
				url:"/edit",
				dataType: "text",
				data:obj,
				success:function(e){
					if(e=="ok"){
						$(this).parent("")
						$(this).parent().html(newv)
					}
				}.bind(this)
			})
			}else{
				$(this).parent().html(oldv)
			}
		})
	})
