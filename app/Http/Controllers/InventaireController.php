<?php

namespace App\Http\Controllers;
use App\Models\Inventaire;

use Illuminate\Http\Request;
use App\Models\Field_inventaire;

use App\Models\Salle;
use App\Models\Inventaire_table;
use App\Models\Field_table_inventaire;
use App\Models\Value_field;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Models\Organigramme;

class InventaireController extends Controller
{
    public function index(){
      
        return view('inventaire.index');

    }
    public function all_inventaire(){

        $table_inventaire = Inventaire::all();  

    
        return  Response()
        ->json($table_inventaire);
        
    }
    public function create(Request $request){
        $new = new Inventaire();

        $new->nom = $request->input('nom_inventaire');
        $new->save();

        return redirect()
            ->route('inventaire');
    }
    
    public function create_inventaire_table(Request $request){
        $new = new Inventaire_table();

        $new->nom           = $request->input('nom_inventaire');
        $new->id_organigrammes = $request->input('id_inventaire');
        
        $new->save();

        return redirect()
            ->route('inventaire_details',$request->input('id_inventaire'));
    }
    public function delete($id){

        $delete= Inventaire::find($id);  
        $delete->delete();

        $data = Inventaire::all();  
   

        return  Response()
        ->json(['etat' => true , 'data' =>  $data    ]);
    
    }

    public function delete_details_inventaire($id){

        $delete= Inventaire_table::find($id);  
        $delete->delete();

        $data = Inventaire_table::all();  
   

        return  Response()
        ->json(['etat' => true , 'data' =>  $data    ]);
    
    }

    public function edit($id){

          
           $field_inventaire = Field_inventaire::where(["id_inventaire_tables" => $id])->get();
           $data =array('id'=> $id , 'field_inventaire' => $field_inventaire );
         return view('inventaire.edit',$data);
    }
    public function store(Request $request){

      
      
    

         if (!empty($request->old_id_champ))
        {
            for ($i = 0;$i < count($request->old_id_champ);$i++)
            {
                $update_attribut = Field_inventaire::find($request->old_id_champ[$i]);
                $update_attribut->nom_champs = $request->old_name_champ[$i];
                $update_attribut->type_champs = $request->old_type_champ[$i];
                
                $update_attribut->save();
            }
        }

        if (!empty($request->new_name_champ))
        {
            for ($i = 0;$i < count($request->new_name_champ);$i++)
            {
                $new_attribut = new Field_inventaire();
                $new_attribut->nom_champs = $request->new_name_champ[$i];
                $new_attribut->type_champs = $request->new_type_champ[$i];
                $new_attribut->id_inventaire_tables = $request->id_inventaire;
                $new_attribut->save();
            }
        }

        


        

         return redirect(route("inventaire_edit", $request->id_inventaire ));
    }
    public function delete_inventaire(Request $request){
        $delete_field = Field_inventaire::find($request->items_delete);

        $delete_field->delete();

    }
    public function create_inventaire(){


       

        $array_table_inventaires = array();
        $array_field_value =array();

        $user = Auth::user();

        $field_inventaire = Field_inventaire::where(["id_inventaire_tables" => $user->id_choix_inventaire ])->get();

        $name = inventaire_table::find($user->id_choix_inventaire);
        $name =  $name->nom;


        $Field_table_inventaire = Field_table_inventaire::where(["inventaire_id" => $user->id_choix_inventaire ])->get();

        for ($i = 0;$i < count($Field_table_inventaire);$i++)
            {
                $array_field_value =array();
                $Value_field = Value_field::where(["id_field_inventaire" => $Field_table_inventaire[$i]->id ])->get();
                for ($j = 0;$j < count($Value_field);$j++)
                {
                    $array_field_value[]= $Value_field[$j]->value;
                    
                }
               $array_table_inventaires[]=array('field_inventaires' => $array_field_value ,'id_field_inventaire' => $Field_table_inventaire[$i]->id  );
               unset($array_field_value);

            }

        $data = array( 'field_inventaires' => $field_inventaire , 'id_inventaires' => $user->id_choix_inventaire , 'array_table_inventaires' => $array_table_inventaires  , 'name' => $name );
        
        return view('inventaire.create_inventaire',$data);
       
    }
        public function inventaire_choix(){

            $user = Auth::user();

            $table_inventaires = Inventaire_table::where(["id_organigrammes" => $user->id_inventaire ])->get();

            $name_inventaire   =  Organigramme::find($user->id_inventaire);
            $name_inventaire   =   $name_inventaire->nom;

            $data = array( 'inventaires' => $table_inventaires, 'name_inventaire' => $name_inventaire );

            return view('inventaire.inventaire_choix',$data);
        }
    public function store_inventaire(Request $request){ 

        

        if (!empty($request->champs))
        {
            $field_table_inventaire = new Field_table_inventaire();
            $field_table_inventaire->inventaire_id = $request->id_inventaires;
            $field_table_inventaire->save();

            for ($i = 0;$i < count($request->champs);$i++)
            {
                $value_field = new Value_field();
                $value_field->value = $request->champs[$i];
                $value_field->id_field_inventaire = $field_table_inventaire->id; 
                $value_field->save();
            }
        }


        return $request->all();

    }
    public function delete_value_field(Request $request){
      
        $Field_table_inventaire_delete = Field_inventaire::find($request->items_delete);
        $Field_table_inventaire_delete->delete();
   
       

    }
    public function delete_value_field_inventaire(Request $request){
      
        $delete_field = Value_field::where(["id_field_inventaire" => $request->items_delete ])->get();
        $Field_table_inventaire_delete = Field_table_inventaire::find($request->items_delete);
        $Field_table_inventaire_delete->delete();
        for ($i = 0;$i < count($delete_field);$i++)
        {
            $delet = Value_field::find($delete_field[$i]->id);
            $delet->delete();
        }
       

    }
    public function inventaire_details($id){
        $data =array('id'=> $id );
        return view('inventaire.inventire_details',$data );


    }
    public function api_inventaire_details($id){
        $table_inventaire = Inventaire_table::where(["id_organigrammes" => $id ])->get();;  

    
        return  Response()
        ->json($table_inventaire);

    }
    public function choix_inventaires(Request $request){

        $choix_inventaire = $request->choix_inventaire;
        $user = Auth::user();
        $upd = User::find($user->id);
        $upd->id_choix_inventaire = $choix_inventaire;
        $upd->save();

        return redirect(route("create__inventaire"));

    }

    public function gestion_physique(Request $request){

          return view("gestion_physique", );

    }
}
