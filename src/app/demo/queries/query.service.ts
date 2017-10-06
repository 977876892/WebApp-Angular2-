import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class UserService {

  constructor (private http: Http) {};

  getQueries() {
   
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php/request?module=easydiscuss&action=get&resource=posts&username="+Cookie.get("username"))
    .map((res:Response) => res.json());
  }

  getDetailQuery(id){
  
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php/request?module=easydiscuss&action=get&resource=posts&id="+id)
    .map((res:Response) => res.json());
  }
  
    replyQuery(id,comment) {
        var headers = new Headers({'Content-Type':'application/X-www-form-urlencoded'});
          let body = new FormData();
          body.append('question_id',id);
          body.append('reply', comment);
          body.append('user_id', Cookie.get("userid"));
          body.append('username',Cookie.get("username"));
          body.append('pwd',btoa(Cookie.get("password")));
          body.append('encode',"true");
          return this.http.post(Cookie.get("ION_SERVER")+"/index.php/request?module=easydiscuss&action=post&resource=reply", body, headers)
          .map((res: Response) => res.json());
    };
        public exportAsExcelFile(json: any[], excelFileName: string): void {
          const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
          const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
          this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
  QueryDelete(id){
       return this.http.delete(Cookie.get("ION_SERVER")+"/index.php/request?module=easydiscuss&action=delete&resource=deletequery&pwd="+btoa(Cookie.get("password"))+"&encode=true&id="+id+"&username="+Cookie.get("username"))
       .map((res: Response) => res.json());
  }


}