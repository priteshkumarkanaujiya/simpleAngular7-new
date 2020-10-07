import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];
    p: number = 1;
    collection: any ;

    constructor(
        private authenticationService: AuthenticationService,
        private AuditService: AuditService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        this.loadAuditDetails();
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }


    private loadAuditDetails() {
        this.AuditService.getAuditDetails().pipe(first()).subscribe(auditDetails => {
            console.log(auditDetails);
            this.collection = auditDetails;
           // this.TotalPages = Number(Math.ceil(this.auditDetails.length / 8));


        });
    }
}