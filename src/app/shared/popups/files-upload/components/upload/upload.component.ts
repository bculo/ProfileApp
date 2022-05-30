import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { UploadTaskSnapshot } from '@angular/fire/compat/storage/interfaces';
import { finalize, firstValueFrom, lastValueFrom, Observable, Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file: File;
  @Output() completed = new EventEmitter<string>();

  task: AngularFireUploadTask;

  percentage$: Observable<number>;
  snapshot$: Observable<UploadTaskSnapshot>;
  downloadURL: string;

  private destroy = new Subject<void>();

  constructor(private storage: AngularFireStorage) { }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  ngOnInit(): void {
    this.startUpload();
  }

  startUpload(): void {
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;

    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);

    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges();

    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize(async () => {
        this.downloadURL = await lastValueFrom(storageRef.getDownloadURL());
        this.completed.next(this.downloadURL);
      })
    ).subscribe();
  }

}
