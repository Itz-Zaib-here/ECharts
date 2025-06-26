import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterOutlet,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
//header
// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header") as HTMLElement | null;
  const scrollPosition = window.scrollY;

  if (header) {
    if (scrollPosition > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});

// Mobile menu toggle
const hamburgerBtn = document.getElementById("hamburger-btn") as HTMLElement | null;
const mobileMenu = document.getElementById("mobile-menu") as HTMLElement | null;

if (hamburgerBtn && mobileMenu) {
  hamburgerBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
    hamburgerBtn.classList.toggle("open");
  });

  // Close menu when clicking anywhere in the mobile menu
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    hamburgerBtn.classList.remove("open");
  });
}
