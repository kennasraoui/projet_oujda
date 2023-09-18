
var count = 2;

function loadFile(event){
  var output = document.getElementById('output');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src+'#toolbar=1') // free memory
      
    }


}


function add_row_select(row){

  var next = row +1 ;

  var id_select =    $('#sous_select_'+row+' option:selected').val();

        if( id_select == '' ){

          var count_p = count;
          for (let i = next; i < count_p+1; i++) {
            $("#row_"+i).remove();
            count = count -1;
          }
          count++;

          $("#attribut_champ").empty();
          $("#attribut_file").empty();

        }

       $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: APP_URL+"/fill_sous_dossier1",
        method:"get",
        data:{
          id_dossier : id_select
        },
        dataType: "json",
        success: function(data) {
      
          if ($.trim(data.dossier_champs)){   

            if( !$("#row_"+next).length ){    
              
             


              row_select = '<div id="row_'+count+'" class="col-md-12">';
              row_select += '<div class="form-group row">';
              row_select += ' <label for="colFormLabelSm" id="" class="col-sm-4 col-form-label col-form-label-sm sous_label_'+count+' text-uppercase" >________ :</label>';
              row_select += ' <input class="nom_champs_select_'+count+'" type="text" name="nom_champs_select[]" value="text" hidden> <div class="col-sm-7">';
              row_select += ' <select class="form-control" id="sous_select_'+count+'" name="value_select[]" onchange="add_row_select('+count+')" >';
              row_select += '<option value="">Selectionne le dossier</option>';
              $.each(data.dossier_champs, function (){
                row_select += '<option value="'+this.id+'">'+this.nom_champs+'</option>';
              });
              row_select += '</select>';
              row_select += '</div></div>';
              row_select += '</div>';


              
              $("#row_"+row).after(row_select);
    
              $(".sous_label_"+next).html(data.dossier_champs_label+" :");

              $(".nom_champs_select_"+next).val(data.dossier_champs_label);


              $(".sous_label_"+next).html(data.dossier_champs_label+" :");
    
              count++;

            }else {

          

              $("#sous_select_"+next).find('option').not(':first').remove();

              $.each(data.dossier_champs, function (){
                $("#sous_select_"+next).append($("<option   />").val(this.id).text(this.nom_champs));
               });
               var tt= next+1;
               $("#sous_select_"+tt).find('option').not(':first').remove();
               $(".sous_label_"+next).html(data.dossier_champs_label+" :");

            
         

            }
          } else {
            var count_pre = count;
        
            for (let i = next; i < count_pre+1; i++) {
              $("#row_"+i).remove();
              count = count -1;
            }
            count++;



          }


          if ($.trim(data.attribut_champ)){   

            $("#attribut_champ").empty();


            $.each(data.attribut_champ, function (){
              if(this.type_champs == "Text"){
   

               


                row_select1 = '<div id="" class="col-md-12">';
                row_select1 += '<div class="form-group row">';
                row_select1 += ' <label for="colFormLabelSm" class=" text-uppercase col-sm-4 col-form-label col-form-label-sm">'+this.nom_champs+' :</label>';
           
                row_select1 += '<div class="col-sm-7">';
                row_select1 += '<input type="text" name="id_champs[]"  value="' + this.id + ' " class="d-none"> ';
                row_select1 += '<input type="text" name="nom_champ[]" value="'+this.nom_champs+' " hidden> <input class="form-control input_champs" onkeyup="showMe(this)" type="text" name="valeur[]"> ';
            
              
                row_select1 += '</div></div>';
                row_select1 += '</div>';




                $("#attribut_champ").append(row_select1);
                
              }
              if(this.type_champs == "date"){
       

                row_select1 = '<div id="" class="col-md-12">';
                row_select1 += '<div class="form-group row">';
                row_select1 += ' <label for="colFormLabelSm" class=" text-uppercase col-sm-4 col-form-label col-form-label-sm">'+this.nom_champs+' :</label>';
           
                row_select1 += '<div class="col-sm-7">';
                row_select1 += '<input type="text" name="nom_champ[]" value="'+this.nom_champs+' " hidden> <input class="form-control input_champs" onkeyup="showMe(this)" type="date" name="valeur[]"> ';
            
              
                row_select1 += '</div></div>';
                row_select1 += '</div>';

                $("#attribut_date").after(row_select1);
              }
      

             
     

            });

            row_select1 = '<div id="" class="col-md-12">';
            row_select1 += '<div class="form-group row">';
            row_select1 += ' <label for="colFormLabelSm" class=" text-uppercase col-sm-4 col-form-label col-form-label-sm">Titre:</label>';
            row_select1 += ' ';
            row_select1 += ' <div class="col-sm-8">';
            row_select1 += '<textarea name="titre" class="form-control" id="folder_name" " ></textarea>';
        
            row_select1 += '';
            row_select1 += '</div></div>';
            row_select1 += '</div>';

            $("#objet").append(row_select1);
    

           } else {
            $("#attribut_champ").empty();
            $("#attribut_file").empty();
            $("#objet").empty();
            $("#attribut_file").removeClass("attribut_file");
           }
       
    




        
        }
      })

}
 
 
 function fill_parent_dossier(){

    $.ajaxSetup({
      headers: {
        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
      }
    });
    $.ajax({
      url: APP_URL+"/fill_parent_dossier",
      method:"get",
      dataType: "json",
      success: function(data) {
       $.each(data, function (){
        
          $("#parent_select").append($("<option     />").val(this.id).text(this.nom_champs));
         });
      
      
      }
    })

}

function fill_entite() {

  $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
      }
  });
  $.ajax({
      url: APP_URL + "/fill_entite",
      method: "get",
      dataType: "json",
      success: function(data) {
          $.each(data, function() {

              $("#entite_select").append($("<option     />").val(this.id).text(this.nom));
          });


      }
  })

}


$(document).ready(function() {




  fill_entite()

  
  fill_parent_dossier()


  $('#entite_select').on('change', function() {
    var id_select = $('#entite_select option:selected').val();

    if (id_select == '') {

        var count_p = count;




        var next = 2;

        for (let i = next; i < count_p + 1; i++) {
            $("#row_" + i).remove();
            count = count - 1;
        }
        count++;

        $("#parent_select").find('option').not(':first').remove();
        $("#sous_select_1").find('option').not(':first').remove();
        $(".sous_label_1").html('________ :');

        $("#attribut_champ").empty();
        $("#attribut_file").empty();

    }


    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajaxSetup({
      headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
      }
  });
  $.ajax({
      url: APP_URL + "/fill_parent_dossier",
      method: "get",
      dataType: "json",
      data: {
        id_entite: id_select
      },
      success: function(data) {
        $("#parent_select").find('option').not(':first').remove();
          $.each(data, function() {

              $("#parent_select").append($("<option     />").val(this.id).text(this.nom_champs));
          });


      }
  })

});


  $('#parent_select').on('change', function() {
    var id_select =    $('#parent_select option:selected').val();


    if( id_select == '' ){

      var count_p = count;

    


      var next = 2 ;
  
      for (let i = next; i < count_p+1; i++) {
        $("#row_"+i).remove();
        count = count -1;
      }
      count++;

      $("#sous_select_1").find('option').not(':first').remove();

      $(".sous_label_1").html('________ :');

      $("#attribut_champ").empty();
      $("#attribut_file").empty();

    }
      

       $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        url: APP_URL+"/fill_sous_dossier",
        method:"get",
        data:{
          id_dossier : id_select
        },
        dataType: "json",
        success: function(data) {

          

   

          $("#sous_select_1").find('option').not(':first').remove();
          $(".sous_label_1").html(data.dossier_champs_label+" :");
          $(".nom_champs_select_1").val(data.dossier_champs_label);
          $.each(data.dossier_champs, function (){
            $("#sous_select_1").append($("<option   />").val(this.id).text(this.nom_champs));
           });


           $("#attribut_champ").empty();
           $("#attribut_file").empty();
           $("#objet").empty();
           $("#attribut_file").removeClass("attribut_file");
           



           var count_pre = count;
          for (let i = 2; i < count_pre+1; i++) {
            $("#row_"+i).remove();
            count = count -1;
          }
          count++;



     
  
        
        
        }
      })

  });


  
  $('#sous_select').on('change', function() {

      



  });


        $('.btn_add_attributs_click').click(function(e) {

           e.preventDefault();
           $(".block_attributs").removeClass("hidden");

  
               
         });

         


         


        


      

            $('#treeview_form').on('submit', function(event){
            
             });

        









});


