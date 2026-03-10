import { render, screen } from "@testing-library/react";
import AlertBanner from "../AlertBanner";

describe("AlertBanner", () => {
  it("renders nothing when no alerts exceed 80%", () => {
    const { container } = render(
      <AlertBanner alerts={[{ category: "Lazer", spent: 100, limit: 900 }]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("shows warning when spending is between 80% and 100%", () => {
    render(
      <AlertBanner alerts={[{ category: "Lazer", spent: 800, limit: 900 }]} />
    );
    expect(screen.getByText(/Lazer.*89%/)).toBeInTheDocument();
  });

  it("shows danger alert when spending exceeds limit", () => {
    render(
      <AlertBanner alerts={[{ category: "Alimentação", spent: 1400, limit: 1300 }]} />
    );
    expect(screen.getByText(/ultrapassado/i)).toBeInTheDocument();
  });
});
