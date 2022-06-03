import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Job } from 'src/app/models/backend/job';

import * as fromRoot from 'src/app/store';
import { FormComponent } from './components/form/form.component';

import * as fromList from './store/list';
import * as fromUser from 'src/app/store/user/user.selectors'
import * as ListActions from './store/list/list.actions';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {

  jobs$: Observable<Job[]>;
  isEditable$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.jobs$ = this.store.pipe(select(fromList.selectAll));
    this.isEditable$ = this.store.pipe(
      select(fromUser.getRoleId),
      map(roleId => ['recruited', 'employee'].includes(roleId))
    );
    this.store.dispatch(fromList.read());
  }

  onAdd(){
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '220px',
      data: {}
    });
  }

  onEdit(value: Job) {
    this.dialog.open(FormComponent, {
      width: '650px',
      height: '220px',
      data: { value }
    });
  }

  onDelete(id: string) {
    this.store.dispatch(ListActions.deleteJob({id: id}));
  }

}
