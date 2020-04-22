import { Component, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { LoginService } from '../../authentication/login/login.service';
import { SidebarService } from './Services/sidebar.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
@Component({
  selector: 'ap-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
    showMenu = '';
    showSubMenu = '';
    public FirstNameInfo: any;
    public LastNameInfo: any;
    public sidebarnavItems: any[];
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element ;
        }
    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        } else {
            this.showSubMenu = element;
        }
    }
    constructor(private modalService: NgbModal, private router: Router,
        private route: ActivatedRoute, private sidebarService: SidebarService) {
      if (this.sidebarService.isLoggedIn()) {
        console.log("logged n");
        this.router.navigate(['home/']);
      } else {
        console.log('logout');
        this.router.navigate(['authentication/login'])
      }
    }
    ngOnInit() {
      this.sidebarService.getCustomerId()
        .subscribe(
          res1 => {
            this.sidebarService.getInfoAccount(res1['Account_id'])
              .subscribe(result => {
                // this.AccountType = result.AccountType.toUpperCase();
                this.FirstNameInfo = result['FirstName'];

                this.LastNameInfo = result['LastName'];
              });
          });
        this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
        $(function () {
            $('.sidebartoggler').on('click', function() {
                if ($('#main-wrapper').hasClass('mini-sidebar')) {
                    $('body').trigger('resize');
                    $('#main-wrapper').removeClass('mini-sidebar');
                } else {
                    $('body').trigger('resize');
                    $('#main-wrapper').addClass('mini-sidebar');
                }
            });

        });
    }
    onLogout() {
      localStorage.clear();
      localStorage.removeItem('token');
      this.router.navigate(['authentication/login']);
    }
  OnSetting() {
      this.router.navigate(['dashboard/profile']);
  }


}
