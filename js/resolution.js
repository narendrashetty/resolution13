$(document).ready(function(){
$("#no_students").live("change",function(){
				var no_stu=$(this).val();
				$("#student_name_fields").html('');
				for(var i=1;i<=no_stu;i++){
					$("#student_name_fields").append("<label class='control-label' for='inputPassword'>Student "+i+": </label><div class='controls'><input type='text' name='students[]' id='student["+i+"]' placeholder='Student Name'></div>");
				}
				$("#student_name_fields").fadeIn(500);
			});
$("#college_name").live("change",function(){
				if ($(this).attr('data-source').indexOf($(this).val()) > -1) {
					$("#no_college").fadeOut(500);
					$("#student_name_fields").html('').fadeOut(500)
					$("#students_block").fadeIn(500);
					$("#register_btn").attr("disabled",false);
					msg='';
				}
				else{
					msg='Your college not in the list? <a href="mailto:resolution.cmrit@gmail.com" target="_BLANK">Mail Us!</a>';
					$("#students_block").fadeOut(500);
					$("#register_btn").attr("disabled",true);
				}
				get_attendees();
				$("#no_college").html(msg).fadeIn(500);
				return false;
			});

			function get_attendees(){
				$.post("json/json.attendees.php",{college: $("#college_name").val()},
				function(data){
					$("#attendees").html('');
					var obj=jQuery.parseJSON(data);
					var names="";
					for(var i=0;i<obj.length;i++){
						names=names+obj[i].name+", ";
					}
					names=names.substring(0,names.length-2);
					if(names!=='')
						$("#attendees").html("Attendees: "+names).hide().fadeIn(500);
				});
			}

			$("#register_form").submit(function(){
				event.preventDefault();
			});

			setInterval(function() {
			$('#news_updates > p:first').delay(800).fadeIn(800).next().fadeOut(800).end().appendTo('#news_updates');
			},6000);

			$(".single_icon").live("mouseenter",function(){
				var id=$(this).attr('id');
				console.log(id);
				for(var i=1;i<=3;i++){
					if(id=='social'+i){
						$("#social"+id).stop().fadeTo(500,1.0);
					}
					else{
						$("#social"+i).stop().fadeTo(500,0.3);
					}
				}
			});

			$(".single_icon").live("mouseleave",function(){
				for(var i=1;i<=3;i++){
						$("#social"+i).stop().fadeTo(500,1.0);
				}
			});

			$("#register_btn").live("click",function(){
				var college_name=$("#college_name").val();
				if(college_name==''){
					$("#college_name").focus();
				}
				else{
					$("#register_form").ajaxForm({
						dataType: 'json',
						success: function(data){
							if(data.status){
								get_attendees();
								$("#student_name_fields").html('').fadeOut(500)
								$("#register_form")[0].reset();
							}
							else{
								$("#js_messages").html('<span class="alert alert-danger span6" style="margin-top: -10px;"><button type="button" class="close" data-dismiss="alert">&times;</button><center>There was an error, make sure all details are filled</center></span>').fadeIn(500);
							}
						},
						error: function(err){
							console.log(err);
						}
					}).submit();
				}
				event.preventDefault();
				return false;
			});


			$("#rules_link").live("click",function(){
			$("#pop").html("<p class='rules'>* All participants should report to registration/reception desk at the venue on 14th September at 08:00 AM.</p><p class='rules'>* Authorization letter from college is mandatory.</p><p class='rules'>* College ID’s of all team members is compulsary.</p><p class='rules'>* Registration fee : Rs. 100/- per member.</p><p class='rules'>* College won’t be responsible for any untoward incidents happening.</p><p class='rules'>* Misbehaviour of the participants inside the campus will not be tolerated and could lead to disqualification of team.</p>");
				$('#pop').bPopup();
			});
			
});
