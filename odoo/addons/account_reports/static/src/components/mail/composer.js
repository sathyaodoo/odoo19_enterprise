import { Composer } from "@mail/core/common/composer";
const { DateTime } = luxon;

export class AccountReportComposer extends Composer {
    static props = [...Composer.props, "reportController?", "date_to"];

    get postData() {
        return {
            ...super.postData,
            account_reports_annotation_date: DateTime.fromISO(this.props.date_to).toFormat("yyyy-MM-dd"),
        };
    }

    async _sendMessage(value, postData, extraData) {
        const message = await super._sendMessage(value, postData, extraData);
        this.props.reportController?.addAnnotation(
            message.id,
            message.model,
            message.res_id,
            message.body
        );
        return message;
    }

    get fullComposerAdditionalContext() {
        return {
            ...super.fullComposerAdditionalContext,
            default_account_reports_annotation_date: DateTime.fromISO(this.props.date_to).toFormat("yyyy-MM-dd"),
        };
    }
}
