import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, Pipe } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ObjToArrayPipe } from '../../obj-to-array.pipe'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ApiService]
})
export class HomeComponent implements OnInit {

  indicators:Array<any>

  constructor( private apiService: ApiService) { 
  this.apiService.getAll().subscribe( (res:any) => {
    console.log('Res', res);
    this.indicators = res
  })}
  ngOnInit(): void {

  }

}
