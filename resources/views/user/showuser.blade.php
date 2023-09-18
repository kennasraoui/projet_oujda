@extends('layouts.app')
@section('content')
<script src="https://code.jquery.com/jquery-1.12.1.min.js"></script> 
<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.3/select2.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/select2/3.4.3/select2.css" rel="stylesheet" />
<script src="{{ asset('assets/js/user.js') }}"></script>
<style>
   .panel_view_bottom {
   display: block;
   }
   .container.btn_role_bottom {
    display: flex;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    }
    .btn_role_bottom button {
    width: 100px;
    margin: 0 auto;
    }
   span.title_profil {
   padding-left: unset !important; 
   }
   .panel_view_bottom {
   height: auto !important;
   margin-bottom: 37px;
   }
   .panel_view_details {
   margin-bottom: 15px;
   }
   #organigramme_table_wrapper {
   margin-bottom: 15px;
   }
   i.fa-solid.fa-circle-xmark {
   font-size: 18px;
   color: #e91e63;
   margin-top: 10px;
   }
   i.caret {
   display: none;
   }
   .row {
   justify-content: center !important;
   }
   .select2-container.form-control {
   height: unset !important;;
   padding: unset !important;;
   border: unset !important;
   width: 100%;
   }
   .select2-container {
   width: 100%;
   font-size: 1rem;
   font-weight: 400;
   line-height: 1.5;
   color: #495057;
   background-color: #fff;
   background-clip: padding-box;
   border-radius: 0.25rem;
   transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
   }
   .panel-heading {
   width: 80% !important;
   }
</style>
<div class="panel-heading"> 
   <a class="link_organigramme" href="{{ route('user_list') }}">
   <span class="material-icons">  home </span>  Les utilisateurs
   </a>
   <span class="title_profil">     \ 
   <span class="ititle_organigramme"> {{$user->nom}} {{$user->prenom}} </span> </span> 
</div>
<div class="panel_view_details">
   <div class="table_p">
      <div class="row justify-content-center pb-3" >
         <div class="col-md-10">
            <div class="card">
               <div class="card-body ">
                  <form method="POST" action="{{ route('updateUser',$user->id) }}">
                     @csrf
                     @method('PUT')
                     <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Nom') }}</label>
                        <div class="col-md-6">
                           <input  id="nom" type="text" class="form-control @error('nom') is-invalid @enderror" name="nom" value="{{$user->nom}}"  autofocus>
                           @error('nom')
                           <span class="invalid-feedback" role="alert">
                           <strong>{{ $message }}</strong>
                           </span>
                           @enderror
                        </div>
                     </div>
                     <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Prénom') }}</label>
                        <div class="col-md-6">
                           <input id="nom" type="text" class="form-control @error('nom') is-invalid @enderror" name="prenom" value="{{$user->prenom}}"  autofocus>
                           @error('prenom')
                           <span class="invalid-feedback" role="alert">
                           <strong>{{ $message }}</strong>
                           </span>
                           @enderror
                        </div>
                     </div>
                     <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Téléphone') }}</label>
                        <div class="col-md-6">
                           <input id="nom" type="number" pattern="[0]{1}[5-7]{1}[0-9]{8}" class="form-control @error('nom') is-invalid @enderror" name="telephone" value="0{{$user->telephone}}"  autofocus>
                           @error('telephone')
                           <span class="invalid-feedback" role="alert">
                           <strong>{{ $message }}</strong>
                           </span>
                           @enderror
                        </div>
                     </div>
                     <?php   function is_array_empty($arr){
                        if(is_array($arr)){
                        foreach($arr as $value){
                            if(!empty($value)){
                                return true;
                            }
                        }
                        }
                        return  false;
                        } ?>
                     <div class="row mb-3">
                        <label for="identifiant" class="col-md-4 col-form-label text-md-end">{{ __('Identifiant') }}</label>
                        <div class="col-md-6">
                           <input id="identifiant" type="text" class="form-control @error('Identifiant') is-invalid @enderror" name="identifiant" value="{{$user->identifiant}}"  autofocus>
                           @error('identifiant')
                           <span class="invalid-feedback" role="alert">
                           <strong>Identifiant que vous avez entrer deja enregistré dans la base de données</strong>
                           </span>
                           @enderror
                        </div>
                     </div>
                     <div class="row mb-3">
                        <label for="email" class="col-md-4 col-form-label text-md-end">Email</label>
                        <div class="col-md-6">
                           <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email" value="{{$user->email}}" required autocomplete="email">
                           @error('email')
                           <span class="invalid-feedback" role="alert">
                           <strong> Email que vous avez entrer deja enregistré dans la base de données</strong>
                           </span>
                           @enderror
                        </div>
                     </div>
                     <div class="row_project_panel1">
                        <div id="row0" class="row mb-3">
                           <label for="select_project" class="col-md-4 col-form-label text-md-end">Les inventaires  </label>
                           <div class="col-md-6">
                              <select id="select_inventaire"  class=" form-control " name="id_iventaire[]" multiple="multiple">
                                 <option value="">Selectionner</option>
                                

                                 <?php $choix_inventaire = json_decode($user->id_inventaire, true);   for($i=0;$i<count($inventaire);$i++){ ?>
                                    <?php if( isset($choix_inventaire)  ) {  ?>
                                      
                                          <?php if (array_search($inventaire[$i]['id'], $choix_inventaire )) {    ?>
                                          <option value="<?php echo $inventaire[$i]['id']; ?>" selected><?php echo $inventaire[$i]['nom']; ?></option>
                                          <?php  } else {  ?>
                                          <option value="<?php echo $inventaire[$i]['id']; ?>" ><?php echo $inventaire[$i]['nom']; ?></option>
                                          <?php  } ?>
                                       <?php  } else { ?>
                                       <option value="<?php echo $inventaire[$i]['id']; ?>" ><?php echo $inventaire[$i]['nom']; ?></option>
                                    <?php  } ?>
                                 <?php  } ?>
                              </select>
                           </div>
                        </div>
                     <div class="row_project_panel">
                        <div id="row0" class="row mb-3">
                           <label for="select_project" class="col-md-4 col-form-label text-md-end">Les Projets  </label>
                           <div class="col-md-6">
                              <select id="select_project" multiple="multiple"  class=" form-control ">
                                 <?php for($i=0;$i<count($organigrammes);$i++){ ?>
                                    <?php if( isset($les_projets)  ) {  ?>
                                       <?php if (array_search($organigrammes[$i]['id'], array_column($les_projets, 'id')) !== false) {    ?>
                                          <option value="<?php echo $organigrammes[$i]['id']; ?>" selected><?php echo $organigrammes[$i]['nom']; ?></option>
                                          <?php  } else {  ?>
                                          <option value="<?php echo $organigrammes[$i]['id']; ?>" ><?php echo $organigrammes[$i]['nom']; ?></option>
                                          <?php  } ?>
                                       <?php  } else { ?>
                                       <option value="<?php echo $organigrammes[$i]['id']; ?>" ><?php echo $organigrammes[$i]['nom']; ?></option>
                                    <?php  } ?>
                                 <?php  } ?>
                              </select>
                           </div>
                        </div>

                       

                        
               


                        <input type="text" value="{{$count_projet}}" id="count_projet" hidden>
                        <?php  for($i=0;$i<count($les_projets);$i++){ ?>
                        <div id="row<?php echo $les_projets[$i]['id']; ?>" class="row mb-3 row_project">
                           <input type="text" value="<?php echo $les_projets[$i]['id']; ?>" name="organigramme_id[]" hidden>
                           <label for="password-confirm" class="col-md-4 col-form-label text-md-end">Les Dossiers a Consulter dans <strong> <?php echo $les_projets[$i]['nom_organigrammes']; ?> </strong>  </label>
                           <div class="col-md-6">
                              <div class="button-container">
                                 <button class="btn_select" type="button" onclick="selectAll{{$les_projets[$i]['id']}}()">Tout sélectionner</button>
                                 <button  class="btn_select" type="button" onclick="deselectAll{{$les_projets[$i]['id']}}()"> Tout déselectionner </button>
                               </div>
                              <select id="select_tree<?php echo $les_projets[$i]['id']; ?>" multiple="multiple" name="dossiers<?php echo $les_projets[$i]['id']; ?>[]" class=" form-control ">
                                 <?php for($j=0;$j<count($les_projets[$i]['dossiers']);$j++){ ?>
                                    <?php if ($les_projets[$i]['dossiers'][$j]['parent_id'] == 0){  ?>
                                       <?php if (is_array_empty($les_projets[$i]['dossiers_select'])){  ?>
                                          <?php if (in_array($les_projets[$i]['dossiers'][$j]['id'], $les_projets[$i]['dossiers_select'])) {  ?>
                                          <option value="<?php echo $les_projets[$i]['dossiers'][$j]['id']; ?>" selected><?php echo $les_projets[$i]['dossiers'][$j]['nom_champs']; ?></option>
                                          <?php  } else { ?>
                                          <option value="<?php echo $les_projets[$i]['dossiers'][$j]['id']; ?>" ><?php echo $les_projets[$i]['dossiers'][$j]['nom_champs']; ?></option>
                                          <?php  } ?>
                                          <?php } else {  ?>
                                          <option value="<?php echo $les_projets[$i]['dossiers'][$j]['id']; ?>" ><?php echo $les_projets[$i]['dossiers'][$j]['nom_champs']; ?></option>
                                       <?php  } ?>
                                    <?php } ?>
                                    
                                 <?php } ?>
                              </select>
                           </div>

                          

                           <script>

                              
                             
                               var id_select = {!! json_encode($les_projets[$i]['id']) !!}
                              $('#select_tree'+{!! json_encode($les_projets[$i]['id']) !!}).select2({});

                              function selectAll{{$les_projets[$i]['id']}}() {
                                 $("#select_tree"+{!! json_encode($les_projets[$i]['id']) !!}+" > option").prop("selected", true);
                                 $("#select_tree"+{!! json_encode($les_projets[$i]['id']) !!}).trigger("change");
                              }

                              function deselectAll{{$les_projets[$i]['id']}}() {
                                 $("#select_tree"+{!! json_encode($les_projets[$i]['id']) !!}+" > option").prop("selected", false);
                                 $("#select_tree"+{!! json_encode($les_projets[$i]['id']) !!}).trigger("change");
                              }

                            
                           
                           </script>
                           
                        </div>
                        <?php  } ?>
                     </div>
                     <div class="row mb-3">
                        <label for="password" class="col-md-4 col-form-label text-md-end">Mot de passe</label>
                        <div class="col-md-6">
                           <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password"  autocomplete="new-password">
                           @error('password')
                           <span class="invalid-feedback" role="alert">
                           <strong>{{ $message }}</strong>
                           </span>
                           @enderror
                        </div>
                     </div>
                    
                     <div class="row mb-5 pt-3">
                        <label for="password-confirm" class="col-md-4 col-form-label text-md-end"></label>
                        <div class="col-md-6">
                           <button type="submit" class="btn btn-primary " >
                           Mettre à jour l'utilisateur
                           </button>
                        </div>
                     </div>
                  </form>
                  <div class="card-header">{{ __('Modifier le role') }}</div>
                  <div class="card-body">
                     <div class="row mb-3">
                        <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Role Occupé :') }}</label>
                        <div class="col-md-6">
                           @if ($user->roles)
                           @foreach ($user->roles as $user_role)
                           <form class="" method="POST"
                              action="{{ route('removeRole', [$user->id, $user_role->id]) }}"
                              style="margin: 2px"
                              onsubmit="return confirm('Are you sure?');">
                              @csrf
                              @method('DELETE')
                              <button type="submit" class="btn btn-danger">{{ $user_role->name }}</button>
                           </form>
                           @endforeach
                           @endif
                        </div>
                     </div>
                     <form method="POST" action="{{ route('assignRole',$user->id) }}">
                        @csrf
                        <div class="row mb-3">
                           <label for="role" class="col-md-4 col-form-label text-md-end">{{ __('Les Roles') }}</label>
                           <div class="col-md-6">
                              <select class="custom-select" id="role" name="role">
                                 @foreach ($roles as $role)
                                 <option value="{{ $role->name }}">{{ $role->name }}</option>
                                 @endforeach
                              </select>
                           </div>
                        </div>
                        <div class="container btn_role_bottom" >
                           <div class="row">
                              <button type="submit" class="btn btn-primary ml-4">
                                 Mettre à jour le rôle
                              </button>
                              &nbsp;
                              <button type="reset" class="btn btn-primary" >
                              {{ __('Annuler') }}
                              </button>
                           </div>
                        </div>
                     </form>
                  </div>
                  </form>
               </div>
               <!--  <div class="card-header">{{ __('Modifier les permissions') }}</div>
                  <div class="card-body">
                          <div class="row mb-3">
                              <label for="permission" class="col-md-4 col-form-label text-md-end">{{ __('Permission assigné :') }}</label>
                  
                              <div class="col-md-6">
                                  @if ($user->permissions)
                                      @foreach ($user->permissions as $user_permission)
                  
                                          <form class="" method="POST"
                                      action="{{ route('revokePermission', [$user->id, $user_permission->id]) }}"
                  
                                      style="margin: 2px"
                                      onsubmit="return confirm('Are you sure?');">
                                      @csrf
                                      @method('DELETE')
                                      <button type="submit" class="btn btn-danger">{{ $user_permission->name }}</button>
                                  </form>
                                      @endforeach
                                  @endif
                  
                          </div>
                          </div>
                          <form method="POST" action="{{ route('givePermission', $user->id) }}">
                              @csrf
                              <div class="row mb-3">
                                  <label for="permission" class="col-md-4 col-form-label text-md-end">{{ __('Les permissions') }}</label>
                  
                                  <div class="col-md-6">
                                      <select class="custom-select" id="permission" name="permission">
                  
                                          @foreach ($permissions as $permission)
                                          <option value="{{ $permission->name }}">{{ $permission->name }}</option>
                  
                                          @endforeach
                                      </select>
                  
                  
                                  </div>
                              </div>
                  
                  
                  
                  
                              <div class="container" style="margin-left:205px">
                                  <div class="row">
                                      <button type="submit" class="btn btn-primary ml-4">
                                          {{ __('Ajouter') }}
                                      </button>
                                      &nbsp;
                  
                                      <button type="reset" class="btn btn-primary" >
                                          {{ __('Annuler') }}
                                      </button>
                                  </div>
                              </div>
                          </form>
                          <br>
                          @if (Session::has('message'))
                          <div class="alert alert-success" style="width: 100%"> {{Session::get('message')}}</div>
                          @endif
                      @if (Session::has('err'))
                      <div class="alert alert-danger" style="width: 100%" role="alert" style="color:red;margin-left: 163px;">
                      {{Session::get('err')}}
                      </div>
                      @endif
                  
                  
                      </div>-->
               @if (Session::has('message'))
               <div class="alert alert-success" style="width: 100%"> {{Session::get('message')}}</div>
               @endif
               @if (Session::has('err'))
               <div class="alert alert-danger" style="width: 100%" role="alert" style="color:red;margin-left: 163px;">
                  {{Session::get('err')}}
               </div>
               @endif
            </div>
         </div>
      </div>
   </div>
</div>
@endsection