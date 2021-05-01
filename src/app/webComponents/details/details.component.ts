import { Component, OnInit } from '@angular/core';
import { DetailsServiceService} from '../../services/details-service.service';
import { ObjToArrayPipe } from '../../obj-to-array.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [DetailsServiceService]
})
export class DetailsComponent implements OnInit {

  uniques:Array<any>
  series:Array<any>

  constructor( private detailsService: DetailsServiceService, private activate: ActivatedRoute) {

    this.activate.paramMap.subscribe(data => {
      const id = data.get('id');

      this.detailsService.getDetails(id).subscribe( (res:any) => {
        console.log('Res', res);

        let tmp = [];
        res.serie.map(x => {
          tmp.push(x)
        })
        this.series = tmp
      })
    })
   }

  ngOnInit(): void {
  }

}
