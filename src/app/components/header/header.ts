import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule, RouterModule],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header {

    constructor(public authService: AuthService) { }

    isFixed = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isFixed = window.scrollY > 150; // cambiar valor según altura del logo
    }
}