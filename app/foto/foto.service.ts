import { Http, Headers } from '@angular/http';
import { FotoComponent } from '../foto/foto.component'
import { Observable } from 'rxjs'
import { Injectable } from '@angular/core'

@Injectable()
export class FotoService {
    http: Http
    headers: Headers
    url: string = 'http://localhost:3000/v1/fotos'

    constructor(http: Http) {
        this.http = http
        this.headers = new Headers();
        this.headers.append("Content-Type", "application/json")
    }

    lista(): Observable<FotoComponent[]> {
        return this.http.get(this.url)
            .map(res => res.json())
    }

    adiciona(foto: FotoComponent): Observable<MensagemCadastro> {
    console.log(foto._id)
        if (foto._id) {
            return this.http
                .put(this.url + '/' + foto._id, JSON.stringify(foto), { headers: this.headers })
                .map(() => new MensagemCadastro("Foto alterada com sucesso", false))
        } else {
            return this.http
                .post(this.url, JSON.stringify(foto), { headers: this.headers })
                .map(() => new MensagemCadastro("Foto adicionada com sucesso", true))
        }
    }

    remove(fotoId) {
        return this.http.delete(this.url + '/' + fotoId)
    }

    buscaPorId(fotoId): Observable<any> {
        return this.http.get(this.url + '/' + fotoId).map(foto => foto.json())
    }
}

export class MensagemCadastro {
    constructor(private _mensagem: string, private _inclusao: boolean) {
        this._mensagem = _mensagem;
        this._inclusao = _inclusao;
    }

    public get mensagem(): string {
        return this._mensagem

    }

    public get inclusao(): boolean {
        return this._inclusao

    }
}