import { PosConfig } from "@point_of_sale/app/models/pos_config";
import { patch } from "@web/core/utils/patch";

patch(PosConfig.prototype, {
    get preparationCategories() {
        let set = super.preparationCategories;
        if (this.preparationDisplayCategories.size > 0) {
            set = new Set([...set, ...this.preparationDisplayCategories]);
        } else if (this.models["pos.prep.display"].length > 0) {
            set = new Set([...set, ...this.models["pos.category"].map((cat) => cat.id)]);
        }
        return set;
    },

    get preparationDisplayCategories() {
        return new Set(
            this.models["pos.prep.display"].flatMap((prepDisplay) =>
                prepDisplay.category_ids.length > 0
                    ? prepDisplay.category_ids.flatMap((cat) => cat.id)
                    : this.models["pos.category"].flatMap((cat) => cat.id)
            )
        );
    },

    get displayTrackingNumber() {
        return (
            super.displayTrackingNumber ||
            this.models["pos.prep.display"].length ||
            this.models["pos.printer"].length
        );
    },
});
