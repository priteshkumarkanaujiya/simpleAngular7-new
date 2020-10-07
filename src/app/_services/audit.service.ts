import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuditService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }



    getAuditDetails() {
        let usr = JSON.parse(localStorage.getItem('currentUser'));

        return this.http.get(`${config.apiUrl}/audit/details?user=` + usr._id);
    }

}