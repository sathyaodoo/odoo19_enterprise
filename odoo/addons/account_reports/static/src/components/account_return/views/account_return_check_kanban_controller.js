import { useSubEnv } from "@odoo/owl";
import { KanbanController } from "@web/views/kanban/kanban_controller";

export class AccountReturnCheckKanbanController extends KanbanController {
    setup() {
        super.setup();

        useSubEnv({
            reload: () => this.model.load(),
        })
    }
}
