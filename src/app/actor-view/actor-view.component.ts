import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-actor-view',
  templateUrl: './actor-view.component.html',
  styleUrls: ['./actor-view.component.scss']
})
export class ActorViewComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)
  public data: {
    Name: string;
    Bio: string;
    Death: string;
    Birth: string;
  }) { }

  ngOnInit(): void {
  }

}
