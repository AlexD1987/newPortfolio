import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  menuOpen: boolean = false;

  ngOnInit(): void {

  }

  toggleButton() {
    this.menuOpen = !this.menuOpen;
    console.log(this.menuOpen);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
