import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { makeStyles } from "@mui/styles";

const styles = makeStyles({
  root: {
    width: "90%",
  },
  icon: {
    "&$activeIcon": {
      color: "#FB784C",
    },
    "&$completedIcon": {
      color: "#FB784C",
    },
  },
  activeIcon: {},
  completedIcon: {},
});

export default function StepperComponent({
  steps,
  currentStep,
}: {
  steps: string[];
  currentStep: string;
}) {
  const classes = styles();
  return (
    <div className="checkout-elements-width">
      <Stepper activeStep={steps.indexOf(currentStep)}>
        {steps.map((item) => {
          return (
            <Step key={item}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    root: classes.icon,
                    active: classes.activeIcon,
                    completed: classes.completedIcon,
                  },
                }}
              >
                {item}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
