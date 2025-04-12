import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class InfoEmployeeRoute extends Route {

    @service employeeService;
    
      model(params) {
        let employee = this.employeeService.employees[params.index];
    
        if (!employee) {
          return null;
        }
        return {
          index: params.index,
          employee: { ...employee },
        };
      }
}
