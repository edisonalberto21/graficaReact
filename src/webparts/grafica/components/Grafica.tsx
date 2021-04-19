import * as React from 'react';
import { IGraficaProps } from './IGraficaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import AnyChart from 'anychart-react/dist/anychart-react.min.js'
import pnp, { sp, Item, ItemAddResult, ItemUpdateResult, Items, ConsoleListener } from "sp-pnp-js"; 
import './App.css';
import { IGrafica } from './IGrafica';
import { IGraficaState } from './IGraficaState'; 

var gra = []

export default class Grafica extends React.Component<IGraficaProps, IGraficaState> {

  constructor(props: IGraficaProps, state: IGraficaState) {                     //Se define el constructor
    super(props);
    this.state = {                                                                   //Estado inicial, array items vacio
      items: [],
     
    };
        
    this.Grafica();                                                     //Se ejecuta el método de consulta
   }


  public render(): React.ReactElement<IGraficaProps> {
 gra=[]
 //Inicio grafica
 const graficas: JSX.Element[] = this.state.items.map((item: IGrafica, i: number): JSX.Element => {   //Recorre el primer elemeto del array, para mostrar la primera noticia
  gra.push([item.Title,item.Valor])
  
  return (
        <>
        {gra}
        </>
  )

 });
  //Fin grafica

    return (
     <>
     <div className="">
      <div className="col-lg-12 col-12 shadow p-3 mb-0 bg-white rounded graf">
      <AnyChart
      type= {this.props.Tipos ? this.props.Tipos : "bar"}
      data={
        gra
    }
      id = {this.props.Tipos ? this.props.Tipos : "bar"}
      title={this.props.description}
      width={'100%'}
      height={'100%'}
  />
  </div>
 
  </div>
     </>
    );
  }

  private Grafica(){
    if(!this.props.lista){                                                       //Condicional para el top de la consulta
      var lista = "Grafica";
 }else{
   lista = this.props.lista;
 }
    pnp.sp.web.lists.getByTitle(lista)
      .items.orderBy('Created', true).get()    //selecciona los items de la lista 
      .then((items: IGrafica[]): void => {
        this.setState({
          items: items
        }); 
      

    }, (error: any): void => {        //Imprime si existe el error
      console.log(error);
       });
      
  }

}
