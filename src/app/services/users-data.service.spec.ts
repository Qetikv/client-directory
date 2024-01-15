import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { UsersDataService } from './users-data.service';
import { User } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('UsersDataService', () => {
    let service: UsersDataService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, StoreModule.forRoot({})],
            providers: [UsersDataService, Store],
        });

        service = TestBed.inject(UsersDataService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add user data successfully', () => {
        const mockUser: User = {
            "id": 1704653612882,
            "firstName": "ქეთი",
            "lastName": "კვირიკაშვილი",
            "gender": "female",
            "privateNumber": "03435435645",
            "mobileNumber": "555234345",
            "countryLegal": "საქართველო",
            "cityLegal": "თბილისი",
            "addressLegal": "ქვემო ავლაბარი",
            "countryActual": "საქართველო",
            "cityActual": "თბილისი",
            "addressActual": "ქვემო ავლაბარი"
        };

        service.addUserData(mockUser).subscribe((addedUser) => {
            expect(addedUser).toEqual(mockUser);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/users');
        expect(req.request.method).toEqual('POST');

        req.flush(mockUser);
    });

    it('should fetch users successfully', () => {
        const mockUsers: User[] = [
            {
                "id": 1704653612882,
                "firstName": "ქეთი",
                "lastName": "კვირიკაშვილი",
                "gender": "female",
                "privateNumber": "03435435645",
                "mobileNumber": "555234345",
                "countryLegal": "საქართველო",
                "cityLegal": "თბილისი",
                "addressLegal": "ქვემო ავლაბარი",
                "countryActual": "საქართველო",
                "cityActual": "თბილისი",
                "addressActual": "ქვემო ავლაბარი"
            },
            {
                "id": 1704653612882,
                "firstName": "ქეთი",
                "lastName": "კვირიკაშვილი",
                "gender": "female",
                "privateNumber": "03435435645",
                "mobileNumber": "555234345",
                "countryLegal": "საქართველო",
                "cityLegal": "თბილისი",
                "addressLegal": "ქვემო ავლაბარი",
                "countryActual": "საქართველო",
                "cityActual": "თბილისი",
                "addressActual": "ქვემო ავლაბარი"
            }
        ];

        service.fetchUsers().subscribe((users) => {
            expect(users).toEqual(mockUsers);
        });

        const req = httpTestingController.expectOne('http://localhost:3000/users');
        expect(req.request.method).toEqual('GET');

        req.flush(mockUsers);
    });

    it('should handle error while fetching users', () => {
        const errorMessage = 'Error fetching users';

        service.fetchUsers().subscribe(
            () => { },
            (error) => {
                expect(error instanceof HttpErrorResponse).toBeTruthy();
                expect(error.status).toEqual(0);
                expect(error.statusText).toEqual('Unknown Error');
                expect(error.url).toEqual('http://localhost:3000/users');
            }
        );

        const req = httpTestingController.expectOne('http://localhost:3000/users');
        expect(req.request.method).toEqual('GET');

        req.error(new ErrorEvent('error', { error: new Error(errorMessage) }));
    });
    ;

    it('should delete user successfully', () => {
        const userId = 1;

        service.deleteUserById(userId).subscribe(() => {
            service.users$.subscribe((users) => {
                expect(users.some((user) => user.id === userId)).toBeFalsy();
            });
        });

        const req = httpTestingController.expectOne(`http://localhost:3000/users/${userId}`);
        expect(req.request.method).toEqual('DELETE');

        req.flush({});
    });
});
