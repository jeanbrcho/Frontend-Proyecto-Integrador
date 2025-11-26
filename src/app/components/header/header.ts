import { Component, HostListener, OnInit  } from '@angular/core';
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
export class Header implements OnInit{

    constructor(public authService: AuthService) { }

    isFixed = false;
    menuOpen = false;
    isDarkMode: boolean = false;

    ngOnInit(): void {
        this.isDarkMode = localStorage.getItem('theme') === 'dark';
        this.aplicarTema(this.isDarkMode);
    }


    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.isFixed = window.scrollY > 150; // cambiar valor según altura del logo
    }
    
    logout() {
        this.authService.logout();
    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    closeMenu() {
        this.menuOpen = false;
    }

    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        this.aplicarTema(this.isDarkMode);
        localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    }

    private aplicarTema(isDark: boolean): void {
        if (isDark) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }

}