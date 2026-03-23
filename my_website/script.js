const toggleButtons = document.querySelectorAll("[data-toggle-target]");

function setChevron(button, expanded) {
  const chevron = button.querySelector(".toggle-chev");
  if (chevron) chevron.textContent = expanded ? "-" : "+";
}

function setInitialState(button, target) {
  const expanded = button.getAttribute("aria-expanded") === "true";
  target.hidden = !expanded;
  target.classList.toggle("is-open", expanded);
  setChevron(button, expanded);
}

function cancelRunningAnimation(target) {
  if (target._toggleAnimation) {
    target._toggleAnimation.cancel();
    target._toggleAnimation = null;
  }
}

function getToggleSpacing(target) {
  const styles = getComputedStyle(target);
  const marginTop = styles.getPropertyValue("--toggle-mt").trim() || "0px";
  const paddingTop = styles.getPropertyValue("--toggle-pt").trim() || "0px";
  return { marginTop, paddingTop };
}

function openTarget(target) {
  target.hidden = false;
  target.classList.add("is-open");
  const spacing = getToggleSpacing(target);
  const fullHeight = target.scrollHeight;
  const animation = target.animate(
    [
      { height: "0px", opacity: 0, marginTop: "0px", paddingTop: "0px" },
      {
        height: `${fullHeight}px`,
        opacity: 1,
        marginTop: spacing.marginTop,
        paddingTop: spacing.paddingTop,
      },
    ],
    { duration: 620, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }
  );

  target._toggleAnimation = animation;
  animation.onfinish = () => {
    target._toggleAnimation = null;
    animation.cancel();
  };
}

function closeTarget(target) {
  const styles = getComputedStyle(target);
  const fullHeight = target.scrollHeight || target.getBoundingClientRect().height;
  const animation = target.animate(
    [
      {
        height: `${fullHeight}px`,
        opacity: Number(styles.opacity) || 1,
        marginTop: styles.marginTop,
        paddingTop: styles.paddingTop,
      },
      { height: "0px", opacity: 0, marginTop: "0px", paddingTop: "0px" },
    ],
    { duration: 520, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "both" }
  );

  target._toggleAnimation = animation;
  animation.onfinish = () => {
    target._toggleAnimation = null;
    target.classList.remove("is-open");
    target.hidden = true;
    animation.cancel();
  };
}

function toggle(button, target, expand) {
  button.setAttribute("aria-expanded", String(expand));
  cancelRunningAnimation(target);
  if (expand) openTarget(target);
  else closeTarget(target);
  setChevron(button, expand);
}

for (const button of toggleButtons) {
  const targetId = button.getAttribute("data-toggle-target");
  const target = targetId ? document.getElementById(targetId) : null;
  if (!target) continue;

  setInitialState(button, target);
  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    toggle(button, target, !expanded);
  });
}
