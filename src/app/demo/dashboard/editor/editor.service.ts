import { Injectable } from '@angular/core';
import { Http,Headers,Response,RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogsPostService {

  constructor (private http: Http) {};

  postTheBlog(title,content,published,blogid) {
     var newDate=new Date();
     var created=newDate.getDate()+"-"+(newDate.getMonth()+1)+"-"+newDate.getFullYear()+" "+ newDate.toString().split(" ")[4];
    console.log(created);

                    let body = new FormData();
                    body.append('title',title);
                    body.append('content',content);
                    body.append("published",published);
                    body.append('write_content',content);
                    body.append('write_content_hidden',content);
                    body.append('created',created);
                    body.append('publish_up',created);
                    body.append("publish_down","0000-00-00 00:00:00");
                    body.append("blogpassword",'');
                    body.append('robots',"");
                    body.append('excerpt','');
                    body.append('permalink','');
                    body.append('copyrights','');
                    body.append('send_notification_emails','1');
                    body.append('subscription',"1");
                    body.append("frontpage","1");
                    body.append("allowcomment","1");
                    body.append("copyrights",'');
                    body.append("key",Cookie.get("authkey"));
                    body.append("image",'');
                    body.append("category_id",Cookie.get("category"));

                    console.log(body);
                    return this.http.post(Cookie.get("ION_SERVER")+"/index.php?option=com_api&format=raw&app=easyblog&resource=blog", body)
                    .map((res: Response) => res.json());
  }
                updateTheBlog(title,content,published,blogid){

                    var newDate=new Date();
                    var created=newDate.getDate()+"-"+(newDate.getMonth()+1)+"-"+newDate.getFullYear()+" "+ newDate.toString().split(" ")[4];
                    let headers = new Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    let options = new RequestOptions({ headers: headers });
                    var body="title="+title+"&content="+content+"&write_content_hidden="+content+"&publish_up="+created+"&copyrights=''&send_notification_emails=1&created="+created+"&write_content="+content+"&published="+published+"&subscription=1&frontpage=1&allowcomment=1&category_id="+Cookie.get("category")+"&publish_down=0000-00-00 00:00:00&blogpassword&id="+blogid+"&robots&excerpt&permalink&key="+Cookie.get("authkey");
                    return new Promise((resolve) => {
                    this.http.put(Cookie.get("ION_SERVER")+"/index.php?option=com_api&format=raw&app=easyblog&resource=blog", body, options).subscribe((data) => {
                        if (data.json()) {
                            console.log(data);
                            resolve(data.json());
                        } else {
                            console.log("Error");
                        }
                            })
                    });
                }
getTheBlog(id)
{
    return this.http.get(Cookie.get("ION_SERVER")+"/index.php?option=com_api&app=easyblog&resource=blog&format=raw&id="+id+"&key="+Cookie.get("authkey"))
    .map((res: Response) => res.json());
}
}
