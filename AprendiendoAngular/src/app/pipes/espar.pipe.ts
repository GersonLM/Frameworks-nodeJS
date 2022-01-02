import { Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'espar',
})

export class EsParPipe implements PipeTransform{
    transform(value: any) {
        let espar = "no es un número par";
        if(value % 2 == 0) espar = "es un número Par";
        return `Año de creación: ${value} y ${espar}`;
    }
}