class B787_10_FMC_IdentPage {
    static ShowPage1(fmc) {
        fmc.clearDisplay();
        let model = SimVar.GetSimVarValue("ATC MODEL", "string", "FMC");
        if (!model) {
            model = "unkn.";
        }
        let date = fmc.getNavDataDateRange();
        fmc.setTemplate([
            ["IDENT"],
            ["MODEL", "ENGINES"],
            ["787-10 TEST", "GEnx-2B67B"],
            ["NAV DATA", "ACTIVE"],
            ["AIRAC", date.toString()],
            ["DRAG/FF"],
            [""],
            ["OP PROGRAM", "CO DATA"],
            ["AW-P010-0-0", "VS1001"],
            ["OPC"],
            ["AW-C010-0-0", ""],
            ["--------------------------------------"],
            ["<INDEX", "<POS INIT"]
        ]);
        if (fmc.urlConfig.index == 1) {
            fmc.onLeftInput[5] = () => { B787_10_FMC_InitRefIndexPage.ShowPage1(fmc); };
            fmc.onRightInput[5] = () => { B787_10_FMC_PosInitPage.ShowPage1(fmc); };
        }
        fmc.updateSideButtonActiveStatus();
    }
}
//# sourceMappingURL=B787_10_FMC_IdentPage.js.map