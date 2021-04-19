import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'GraficaWebPartStrings';
import Grafica from './components/Grafica';
import { IGraficaProps } from './components/IGraficaProps';

export interface IGraficaWebPartProps {
  description: string;
  Tipos: string;
  lista:string;
}

export default class GraficaWebPart extends BaseClientSideWebPart <IGraficaWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraficaProps> = React.createElement(
      Grafica,
      {
        description: this.properties.description,
        Tipos: this.properties.Tipos,
        lista: this.properties.lista
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Titulo'
                }),
                PropertyPaneTextField('lista', {
                  label: 'Lista'
                }),
                PropertyPaneDropdown('Tipos', {
                  label: 'Tipo de Gráfica',
                  options: [
                    { key: 'bar', text: 'bar' },
                    { key: 'barmekko', text: 'barmekko' },
                    { key: 'pie', text: 'pie' },
                    { key: 'area', text: 'area' },
                    { key: 'line', text: 'line' },
                    { key: 'pareto', text: 'pareto' },
                   ],
                   })
              ]
            }
          ]
        }
      ]
    };
  }
}
