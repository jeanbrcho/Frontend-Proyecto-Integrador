import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
   
    constructor(public authService: AuthService) { }

}