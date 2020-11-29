class B787_10_FMC_NavRadioPage {
    static ShowPage(fmc) {
        fmc.clearDisplay();
        B787_10_FMC_NavRadioPage._timer = 0;
        fmc.pageUpdate = () => {
            B787_10_FMC_NavRadioPage._timer++;
            if (B787_10_FMC_NavRadioPage._timer >= 100) {
                B787_10_FMC_NavRadioPage.ShowPage(fmc);
            }
        };
        let radioOn = fmc.isRadioNavActive();
        let vor1FrequencyCell = "";
        let vor1CourseCell = "";
        if (!radioOn) {
            vor1FrequencyCell = "-----";
            if (fmc.vor1Frequency > 0) {
                vor1FrequencyCell = "/ " + fmc.vor1Frequency.toFixed(2);
            }
            fmc.onLeftInput[0] = () => {
                let value = fmc.inOut;
                let numValue = parseFloat(value);
                fmc.clearUserInput();
                if (isFinite(numValue) && numValue >= 108 && numValue <= 117.95 && RadioNav.isHz50Compliant(numValue)) {
                    fmc.vor1Frequency = numValue;
                    if (fmc.isRadioNavActive()) {
                        fmc.requestCall(() => {
                            B787_10_FMC_NavRadioPage.ShowPage(fmc);
                        });
                    }
                    else {
                        fmc.radioNav.setVORStandbyFrequency(1, numValue).then(() => {
                            fmc.radioNav.swapVORFrequencies(1);
                            fmc.requestCall(() => {
                                B787_10_FMC_NavRadioPage.ShowPage(fmc);
                            });
                        });
                    }
                }
                else if (value === FMCMainDisplay.clrValue) {
                    fmc.vor1Frequency = 0;
                    B787_10_FMC_NavRadioPage.ShowPage(fmc);
                }
                else {
                    fmc.showErrorMessage(fmc.defaultInputErrorMessage);
                }
            };
            vor1CourseCell = "-----";
            if (fmc.vor1Course >= 0) {
                vor1CourseCell = fmc.vor1Course.toFixed(0) + "°";
            }
            fmc.onLeftInput[1] = () => {
                let value = fmc.inOut;
                let numValue = parseFloat(value);
                fmc.clearUserInput();
                if (isFinite(numValue) && numValue >= 0 && numValue < 360) {
                    SimVar.SetSimVarValue("K:VOR1_SET", "number", numValue).then(() => {
                        fmc.vor1Course = numValue;
                        fmc.requestCall(() => {
                            B787_10_FMC_NavRadioPage.ShowPage(fmc);
                        });
                    });
                }
                else {
                    fmc.showErrorMessage(fmc.defaultInputErrorMessage);
                }
            };
        }
        let vor2FrequencyCell = "";
        let vor2CourseCell = "";
        if (!radioOn) {
            vor2FrequencyCell = "-----";
            if (fmc.vor2Frequency > 0) {
                vor2FrequencyCell = "/ " + fmc.vor2Frequency.toFixed(2);
            }
            fmc.onRightInput[0] = () => {
                let value = fmc.inOut;
                let numValue = parseFloat(value);
                fmc.clearUserInput();
                if (isFinite(numValue) && numValue >= 108 && numValue <= 117.95 && RadioNav.isHz50Compliant(numValue)) {
                    fmc.vor2Frequency = numValue;
                    if (fmc.isRadioNavActive()) {
                        fmc.requestCall(() => {
                            B787_10_FMC_NavRadioPage.ShowPage(fmc);
                        });
                    }
                    else {
                        fmc.radioNav.setVORStandbyFrequency(2, numValue).then(() => {
                            fmc.radioNav.swapVORFrequencies(2);
                            fmc.requestCall(() => {
                                B787_10_FMC_NavRadioPage.ShowPage(fmc);
                            });
                        });
                    }
                }
                else if (value === FMCMainDisplay.clrValue) {
                    fmc.vor2Frequency = 0;
                    B787_10_FMC_NavRadioPage.ShowPage(fmc);
                }
                else {
                    fmc.showErrorMessage(fmc.defaultInputErrorMessage);
                }
            };
            vor2CourseCell = "-----";
            if (fmc.vor2Course >= 0) {
                vor2CourseCell = fmc.vor2Course.toFixed(0) + "°";
            }
            fmc.onRightInput[1] = () => {
                let value = fmc.inOut;
                let numValue = parseFloat(value);
                fmc.clearUserInput();
                if (isFinite(numValue) && numValue >= 0 && numValue < 360) {
                    SimVar.SetSimVarValue("K:VOR2_SET", "number", numValue).then(() => {
                        fmc.vor2Course = numValue;
                        fmc.requestCall(() => {
                            B787_10_FMC_NavRadioPage.ShowPage(fmc);
                        });
                    });
                }
                else {
                    fmc.showErrorMessage(fmc.defaultInputErrorMessage);
                }
            };
        }
        let adf1FrequencyCell = "";
        let adf2FrequencyCell = "";
        let ilsFrequencyCell = "";
        let ilsCourseCell = "";
        if (!radioOn) {
            adf1FrequencyCell = "-----";
            if (fmc.adf1Frequency > 0) {
                adf1FrequencyCell = fmc.adf1Frequency.toFixed(2);
            }
            fmc.onLeftInput[2] = () => {
                let value = fmc.inOut;
                let numValue = parseFloat(value);
                fmc.clearUserInput();
                if (isFinite(numValue) && numValue >= 100 && numValue <= 1699.9) {
                    SimVar.SetSimVarValue("K:ADF_COMPLETE_SET", "Frequency ADF BCD32", Avionics.Utils.make_adf_bcd32(numValue * 1000)).then(() => {
                        fmc.adf1Frequency = numValue;
                        fmc.requestCall(() => {
                            B787_10_FMC_NavRadioPage.ShowPage(fmc);
                        });
                    });
                }
                else {
                    fmc.showErrorMessage(fmc.defaultInputErrorMessage);
                }
            };
            adf2FrequencyCell = "-----";
            if (fmc.adf2Frequency > 0) {
                adf2FrequencyCell = fmc.adf2Frequency.toFixed(2);
            }
            fmc.onRightInput[2] = () => {
                let value = fmc.inOut;
                let numValue = parseFloat(value);
                fmc.clearUserInput();
                if (isFinite(numValue) && numValue >= 100 && numValue <= 1699.9) {
                    SimVar.SetSimVarValue("K:ADF2_COMPLETE_SET", "Frequency ADF BCD32", Avionics.Utils.make_adf_bcd32(numValue * 1000)).then(() => {
                        fmc.adf2Frequency = numValue;
                        fmc.requestCall(() => {
                            B787_10_FMC_NavRadioPage.ShowPage(fmc);
                        });
                    });
                }
                else {
                    fmc.showErrorMessage(fmc.defaultInputErrorMessage);
                }
            };
            ilsFrequencyCell = "[]/ ";
            ilsCourseCell = "[]";
            let approach = fmc.flightPlanManager.getApproach();
            if (approach && approach.name && approach.name.indexOf("ILS") !== -1) {
                ilsFrequencyCell = Avionics.Utils.formatRunway(approach.name) + "/ ";
                let runway = fmc.flightPlanManager.getApproachRunway();
                if (runway) {
                    ilsCourseCell = runway.direction.toFixed(0) + "°";
                }
            }
            if (isFinite(fmc.ilsFrequency) && fmc.ilsFrequency > 0) {
                ilsFrequencyCell += fmc.ilsFrequency.toFixed(2);
            }
            else {
                ilsFrequencyCell += "[ ]";
            }
            fmc.onLeftInput[3] = () => {
                let value = fmc.inOut;
                fmc.clearUserInput();
                if (fmc.setIlsFrequency(value)) {
                    B787_10_FMC_NavRadioPage.ShowPage(fmc);
                }
            };
        }
        fmc.setTemplate([
            ["NAV RADIO"],
            ["VOR L", "VOR R"],
            [vor1FrequencyCell, vor2FrequencyCell],
            ["CRS", "CRS", "RADIAL"],
            [vor1CourseCell, vor2CourseCell],
            ["ADF L", "ADF R"],
            [adf1FrequencyCell, adf2FrequencyCell],
            ["ILS-MLS"],
            [ilsFrequencyCell],
            [""],
            [""],
            ["", "", "PRESELECT"],
            ["------", "------"]
        ]);
        fmc.updateSideButtonActiveStatus();
    }
}
//# sourceMappingURL=B787_10_FMC_NavRadioPage.js.map