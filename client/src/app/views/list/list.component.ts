import { Component, OnInit } from '@angular/core';
import { BaseListComponent, GridColumns, Action } from '~core/utils/base-list.component';
import { RequisitionService } from '~core/entities/requisition/requisition.service';
import { converterCurrency, defaultCatch } from '~core/utils/helpers';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '~core/entities/user/user';
import { UserLevel } from '~core/enums';
import { UserService } from '~core/entities/user/user.service';
import { Requisition, RequisitionDto } from '~core/entities/requisition/requisition';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'n-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends BaseListComponent implements OnInit {

  activeUser: User;
  specialGrids: GridColumns[];
  isAdmin = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private requisitionService: RequisitionService
  ) {
    super();
  }

  ngOnInit() {
    this.route.data
      .pipe(this.pipeUnsubscribe)
      .subscribe(data => this.dataRouteChange(data));

    this.initGridColumns();
    this.updateGrid();

    this.specialGrids.map((column) => this.columnsLabel.push(column.field));
    this.gridColumns.map((column) => this.columnsLabel.push(column.field));
    if (!this.isAdmin) {
      this.columnsLabel.push('actions');
    }
  }

  viewRequisition(id: string) {
    this.router.navigate([`requisition/view/${id}`], {queryParamsHandling: 'merge'});
  }

  private updateGrid() {
    this.gridData = [];
    this.isLoading = true;

    let service = this.requisitionService.findAll();

    if (this.activeUser.level === UserLevel.ABDICATOR) {
      service = this.requisitionService.findAllByRequester(this.activeUser.id);
    }

    service.pipe(
      this.pipeUnsubscribe,
      defaultCatch()
    ).subscribe(
      (resp: Requisition[]) => {
        const result: RequisitionDto[] = [];
        if (resp.length > 0) {
          resp.forEach((item: any, index: number) => {
            forkJoin(
              this.userService.findOne(item.requester),
              this.userService.findOne(item.abdicator)
            ).pipe(
              this.pipeUnsubscribe,
              defaultCatch()
            ).subscribe((users: User[]) => {
              item.requester = users[0];
              item.abdicator = users[1];

              switch (item.status) {
                case 'WAITING':
                  item.status = 'Esperando aprovação';
                  break;
                case 'ACCEPT':
                  item.status = 'Requisição Aprovada';
                  break;
              }

              result.push(item);

              if (index === resp.length - 1) {
                this.gridData = result;
                this.hasError = false;
                this.isLoading = false;
              }
            });
          });
        }
      },
      () => {
        this.hasError = true;
        this.isLoading = false;
      }
    );
  }

  private initGridColumns() {
    this.specialGrids = [
      {
        field: 'requesterName',
        label: 'Nome do solicitante',
      }
    ];

    if (this.isAdmin) {
      this.specialGrids.push({
        field: 'approverName',
        label: 'Nome do aprovador',
      });
    }

    this.gridColumns = [
      {
        field: 'description',
        label: 'Descrição da requisição',
      },
      {
        field: 'price',
        label: 'Preço da requisição',
        converter: (money) => converterCurrency(money)
      }
    ];

    if (this.isAdmin) {
      this.gridColumns.push({
        field: 'status',
        label: 'Satus'
      });
    }
  }

  private dataRouteChange(data): void {
    const { user } = data;

    if (user) {
      this.activeUser = user;
      this.isAdmin = this.activeUser.level === UserLevel.ADMIN;
    }

  }
}
